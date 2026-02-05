"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api, auth, type UserResponse } from "@/lib/api";

// Icons as SVG components
const UserIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const LogOutIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

const KeyIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
);

const TrashIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
);

const UploadIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
);

const DownloadIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const SettingsIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const FileIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
    </svg>
);

const CloseIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

interface UserDashboardProps {
    user?: UserResponse;
}

export function UserDashboard({ user: initialUser }: UserDashboardProps) {
    const [userData, setUserData] = React.useState<UserResponse | null>(null);
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [isUploading, setIsUploading] = React.useState(false);
    const [uploadError, setUploadError] = React.useState<string | null>(null);
    const [uploadSuccess, setUploadSuccess] = React.useState<string | null>(
        null,
    );
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [isUpdatingProfile, setIsUpdatingProfile] = React.useState(false);
    const [profileUpdateSuccess, setProfileUpdateSuccess] = React.useState<
        string | null
    >(null);
    const [profileUpdateError, setProfileUpdateError] = React.useState<
        string | null
    >(null);
    const [editableFields, setEditableFields] = React.useState({
        first_name: "",
        last_name: "",
        address: "",
    });
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    // Load user data from localStorage on mount
    React.useEffect(() => {
        const storedUser = auth.getUser();
        if (storedUser) {
            setUserData(storedUser);
            setEditableFields({
                first_name: storedUser.first_name || "",
                last_name: storedUser.last_name || "",
                address: storedUser.address || "",
            });
        } else if (initialUser) {
            setUserData(initialUser);
            setEditableFields({
                first_name: initialUser.first_name || "",
                last_name: initialUser.last_name || "",
                address: initialUser.address || "",
            });
        } else {
            // Redirect to login if no user found
            window.location.href = "/signin-page";
        }
    }, [initialUser]);

    const handleEditableFieldChange = (
        field: keyof typeof editableFields,
        value: string,
    ) => {
        setEditableFields((prev) => ({ ...prev, [field]: value }));
        // Clear messages when user starts typing
        if (profileUpdateSuccess) setProfileUpdateSuccess(null);
        if (profileUpdateError) setProfileUpdateError(null);
    };

    const handleUpdateProfile = async () => {
        if (!userData) return;

        setIsUpdatingProfile(true);
        setProfileUpdateError(null);
        setProfileUpdateSuccess(null);

        try {
            const updates: {
                first_name?: string;
                last_name?: string;
                address?: string;
            } = {};

            // Only include fields that have changed
            if (editableFields.first_name !== (userData.first_name || "")) {
                updates.first_name = editableFields.first_name || undefined;
            }
            if (editableFields.last_name !== (userData.last_name || "")) {
                updates.last_name = editableFields.last_name || undefined;
            }
            if (editableFields.address !== (userData.address || "")) {
                updates.address = editableFields.address || undefined;
            }

            if (Object.keys(updates).length === 0) {
                setProfileUpdateError("No changes to save");
                setIsUpdatingProfile(false);
                return;
            }

            const updatedUser = await api.updateUser(
                userData.username,
                updates,
            );
            setUserData(updatedUser);
            auth.setUser(updatedUser);
            setProfileUpdateSuccess("Profile updated successfully!");
        } catch (err) {
            setProfileUpdateError(
                err instanceof Error ? err.message : "Failed to update profile",
            );
        } finally {
            setIsUpdatingProfile(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUploadError(null);
        setUploadSuccess(null);
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (!file.name.endsWith(".txt")) {
                setUploadError("Only .txt files are allowed");
                return;
            }
            setSelectedFile(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        setUploadError(null);
        setUploadSuccess(null);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (!file.name.endsWith(".txt")) {
                setUploadError("Only .txt files are allowed");
                return;
            }
            setSelectedFile(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile || !userData) return;

        setIsUploading(true);
        setUploadError(null);
        setUploadSuccess(null);

        try {
            const updatedUser = await api.uploadFile(
                userData.username,
                selectedFile,
            );
            setUploadSuccess(
                `File "${updatedUser.original_filename}" uploaded successfully! (${updatedUser.file_word_count} words)`,
            );
            setSelectedFile(null);
            // Update local user data with full response including file_word_count
            setUserData(updatedUser);
            auth.setUser(updatedUser);
        } catch (err) {
            setUploadError(
                err instanceof Error ? err.message : "Failed to upload file",
            );
        } finally {
            setIsUploading(false);
        }
    };

    const handleDownload = async () => {
        if (!userData) return;

        try {
            const blob = await api.downloadFile(userData.username);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = userData.original_filename || "download.txt";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            setUploadError(
                err instanceof Error ? err.message : "Failed to download file",
            );
        }
    };

    const handleDeleteFile = async () => {
        if (!userData) return;

        try {
            await api.deleteFile(userData.username);
            const updatedUser = {
                ...userData,
                original_filename: null,
                file_word_count: null,
            };
            setUserData(updatedUser);
            auth.setUser(updatedUser);
            setUploadSuccess("File deleted successfully!");
        } catch (err) {
            setUploadError(
                err instanceof Error ? err.message : "Failed to delete file",
            );
        }
    };

    const handleLogout = () => {
        auth.clearUser();
        window.location.href = "/signin-page";
    };

    const handlePasswordReset = async () => {
        const newPassword = prompt("Enter your new password:");
        if (!newPassword || !userData) return;

        try {
            await api.updateUser(userData.username, { password: newPassword });
            alert("Password updated successfully!");
        } catch (err) {
            alert(
                err instanceof Error
                    ? err.message
                    : "Failed to update password",
            );
        }
    };

    const handleDeleteAccount = async () => {
        if (!userData) return;

        if (
            confirm(
                "Are you sure you want to delete your account? This action cannot be undone.",
            )
        ) {
            setIsDeleting(true);
            try {
                await api.deleteUser(userData.username);
                auth.clearUser();
                window.location.href = "/signup-page";
            } catch (err) {
                alert(
                    err instanceof Error
                        ? err.message
                        : "Failed to delete account",
                );
            } finally {
                setIsDeleting(false);
            }
        }
    };

    const getInitials = (firstName: string | null, lastName: string | null) => {
        const first = firstName?.charAt(0) || "";
        const last = lastName?.charAt(0) || "";
        return (
            (first + last).toUpperCase() ||
            userData?.username?.charAt(0)?.toUpperCase() ||
            "U"
        );
    };

    // Show loading state while user data is being loaded
    if (!userData) {
        return (
            <div className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center">
                <p className="text-muted-foreground">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="mx-auto max-w-4xl space-y-6">
                {/* Header with User Menu */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Dashboard</h1>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="relative h-10 w-10 rounded-full"
                            >
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback>
                                        {getInitials(
                                            userData.first_name,
                                            userData.last_name,
                                        )}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-56"
                            align="end"
                            forceMount
                        >
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {userData.first_name &&
                                        userData.last_name
                                            ? `${userData.first_name} ${userData.last_name}`
                                            : userData.username}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {userData.email}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handlePasswordReset}>
                                <KeyIcon />
                                <span className="ml-2">Reset Password</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOutIcon />
                                <span className="ml-2">Log out</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={handleDeleteAccount}
                                className="text-destructive focus:text-destructive"
                                disabled={isDeleting}
                            >
                                <TrashIcon />
                                <span className="ml-2">
                                    {isDeleting
                                        ? "Deleting..."
                                        : "Delete Account"}
                                </span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* User Profile Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserIcon />
                            User Profile
                        </CardTitle>
                        <CardDescription>
                            Your personal information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {profileUpdateError && (
                            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                                {profileUpdateError}
                            </div>
                        )}
                        {profileUpdateSuccess && (
                            <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400">
                                {profileUpdateSuccess}
                            </div>
                        )}
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Avatar Section */}
                            <div className="flex flex-col items-center gap-4">
                                <Avatar className="h-24 w-24">
                                    <AvatarFallback className="text-2xl">
                                        {getInitials(
                                            editableFields.first_name ||
                                                userData.first_name,
                                            editableFields.last_name ||
                                                userData.last_name,
                                        )}
                                    </AvatarFallback>
                                </Avatar>
                                <p className="text-sm text-muted-foreground">
                                    @{userData.username}
                                </p>
                            </div>

                            {/* User Details */}
                            <div className="flex-1 grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label className="text-muted-foreground">
                                        Username (not editable)
                                    </Label>
                                    <Input
                                        value={userData.username}
                                        readOnly
                                        disabled
                                        className="bg-muted text-muted-foreground cursor-not-allowed"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-muted-foreground">
                                        Email (not editable)
                                    </Label>
                                    <Input
                                        value={userData.email}
                                        readOnly
                                        disabled
                                        className="bg-muted text-muted-foreground cursor-not-allowed"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>First Name</Label>
                                    <Input
                                        value={editableFields.first_name}
                                        onChange={(e) =>
                                            handleEditableFieldChange(
                                                "first_name",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Enter first name"
                                        disabled={isUpdatingProfile}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Last Name</Label>
                                    <Input
                                        value={editableFields.last_name}
                                        onChange={(e) =>
                                            handleEditableFieldChange(
                                                "last_name",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Enter last name"
                                        disabled={isUpdatingProfile}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Address</Label>
                                    <Input
                                        value={editableFields.address}
                                        onChange={(e) =>
                                            handleEditableFieldChange(
                                                "address",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Enter address"
                                        disabled={isUpdatingProfile}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={handleUpdateProfile}
                            disabled={isUpdatingProfile}
                            className="w-full md:w-auto"
                        >
                            {isUpdatingProfile
                                ? "Updating..."
                                : "Update Profile"}
                        </Button>
                    </CardFooter>
                </Card>

                {/* Current File Card (if user has a file) */}
                {userData.original_filename && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileIcon />
                                Your File
                            </CardTitle>
                            <CardDescription>
                                Currently uploaded file
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="rounded bg-primary/10 p-2">
                                        <FileIcon />
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            {userData.original_filename}
                                        </p>
                                        {userData.file_word_count !== null && (
                                            <p className="text-sm text-muted-foreground">
                                                {userData.file_word_count} words
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleDownload}
                                    >
                                        <DownloadIcon />
                                        <span className="ml-2">Download</span>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={handleDeleteFile}
                                    >
                                        <TrashIcon />
                                        <span className="ml-2">Delete</span>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* File Upload Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UploadIcon />
                            File Upload
                        </CardTitle>
                        <CardDescription>
                            Upload a .txt file (will replace existing file if
                            any)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {uploadError && (
                            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                                {uploadError}
                            </div>
                        )}
                        {uploadSuccess && (
                            <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400">
                                {uploadSuccess}
                            </div>
                        )}
                        <div
                            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                                isDragging
                                    ? "border-primary bg-primary/5"
                                    : "border-muted-foreground/25 hover:border-primary/50"
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="flex flex-col items-center gap-4">
                                <div className="rounded-full bg-muted p-4">
                                    <UploadIcon />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-lg font-medium">
                                        Drag and drop your .txt file here
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        or click to browse from your computer
                                    </p>
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".txt"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    disabled={isUploading}
                                >
                                    Browse Files
                                </Button>
                            </div>
                        </div>

                        {selectedFile && (
                            <div className="mt-4 p-4 bg-muted rounded-lg flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded bg-primary/10 p-2">
                                        <FileIcon />
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            {selectedFile.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {(selectedFile.size / 1024).toFixed(
                                                2,
                                            )}{" "}
                                            KB
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSelectedFile(null)}
                                    disabled={isUploading}
                                >
                                    <CloseIcon />
                                </Button>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={handleUpload}
                            disabled={!selectedFile || isUploading}
                            className="w-full md:w-auto"
                        >
                            {isUploading ? "Uploading..." : "Upload File"}
                        </Button>
                    </CardFooter>
                </Card>

                {/* Account Actions Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <SettingsIcon />
                            Account Settings
                        </CardTitle>
                        <CardDescription>Manage your account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                variant="outline"
                                onClick={handlePasswordReset}
                                className="flex-1"
                            >
                                <KeyIcon />
                                <span className="ml-2">Reset Password</span>
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleLogout}
                                className="flex-1"
                            >
                                <LogOutIcon />
                                <span className="ml-2">Log Out</span>
                            </Button>
                        </div>
                        <Separator />
                        <div className="pt-2">
                            <p className="text-sm text-muted-foreground mb-3">
                                Danger Zone: This action is irreversible
                            </p>
                            <Button
                                variant="destructive"
                                onClick={handleDeleteAccount}
                                disabled={isDeleting}
                            >
                                <TrashIcon />
                                <span className="ml-2">
                                    {isDeleting
                                        ? "Deleting..."
                                        : "Delete Account"}
                                </span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
