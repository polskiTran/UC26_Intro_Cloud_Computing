// API configuration
// Use /api prefix which nginx proxies to the backend
// This works for both local dev (with nginx) and EC2 deployment
const API_BASE_URL = import.meta.env.PUBLIC_API_URL || "/api";

// Types matching backend schemas
export interface UserCreate {
    username: string;
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
    address?: string;
}

export interface UserLogin {
    username: string;
    password: string;
}

export interface UserUpdate {
    first_name?: string;
    last_name?: string;
    address?: string;
    password?: string;
}

export interface UserResponse {
    id: number;
    username: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    address: string | null;
    file_word_count: number | null;
    original_filename: string | null;
}

export interface ApiError {
    detail: string | { msg: string }[] | Record<string, unknown>;
}

// Helper function to extract error message from FastAPI error response
function extractErrorMessage(error: ApiError, statusCode: number): string {
    if (typeof error.detail === "string") {
        return error.detail;
    }
    // Handle validation errors (array of {msg: string, ...})
    if (Array.isArray(error.detail)) {
        return error.detail.map((e) => e.msg || JSON.stringify(e)).join(", ");
    }
    // Handle object errors
    if (typeof error.detail === "object" && error.detail !== null) {
        return JSON.stringify(error.detail);
    }
    return `HTTP error! status: ${statusCode}`;
}

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
            const error: ApiError = await response.json();
            errorMessage = extractErrorMessage(error, response.status);
        } catch {
            // If JSON parsing fails, use default message
        }
        throw new Error(errorMessage);
    }
    return response.json();
}

// User API functions
export const api = {
    // Create a new user (signup)
    async createUser(userData: UserCreate): Promise<UserResponse> {
        const response = await fetch(`${API_BASE_URL}/users/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        return handleResponse<UserResponse>(response);
    },

    // Login user
    async login(credentials: UserLogin): Promise<UserResponse> {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        return handleResponse<UserResponse>(response);
    },

    // Update user info
    async updateUser(
        username: string,
        updates: UserUpdate,
    ): Promise<UserResponse> {
        const response = await fetch(
            `${API_BASE_URL}/users/${encodeURIComponent(username)}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updates),
            },
        );
        return handleResponse<UserResponse>(response);
    },

    // Delete user
    async deleteUser(username: string): Promise<{ message: string }> {
        const response = await fetch(
            `${API_BASE_URL}/users/${encodeURIComponent(username)}`,
            {
                method: "DELETE",
            },
        );
        return handleResponse<{ message: string }>(response);
    },

    // Upload file for user - returns updated user with file_word_count
    async uploadFile(username: string, file: File): Promise<UserResponse> {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(
            `${API_BASE_URL}/users/${encodeURIComponent(username)}/file`,
            {
                method: "POST",
                body: formData,
            },
        );
        return handleResponse<UserResponse>(response);
    },

    // Download file for user
    async downloadFile(username: string): Promise<Blob> {
        const response = await fetch(
            `${API_BASE_URL}/users/${encodeURIComponent(username)}/file`,
            {
                method: "GET",
            },
        );
        if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
                const error: ApiError = await response.json();
                errorMessage = extractErrorMessage(error, response.status);
            } catch {
                // If JSON parsing fails, use default message
            }
            throw new Error(errorMessage);
        }
        return response.blob();
    },

    // Delete file for user
    async deleteFile(username: string): Promise<{ message: string }> {
        const response = await fetch(
            `${API_BASE_URL}/users/${encodeURIComponent(username)}/file`,
            {
                method: "DELETE",
            },
        );
        return handleResponse<{ message: string }>(response);
    },

    // Health check
    async healthCheck(): Promise<{ message: string }> {
        const response = await fetch(`${API_BASE_URL}/`);
        return handleResponse<{ message: string }>(response);
    },
};

// Session/Auth helpers
export const auth = {
    // Store user in localStorage after login
    setUser(user: UserResponse): void {
        localStorage.setItem("user", JSON.stringify(user));
    },

    // Get current user from localStorage
    getUser(): UserResponse | null {
        const userStr = localStorage.getItem("user");
        if (!userStr) return null;
        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    },

    // Clear user from localStorage (logout)
    clearUser(): void {
        localStorage.removeItem("user");
    },

    // Check if user is logged in
    isLoggedIn(): boolean {
        return !!this.getUser();
    },
};

export default api;
