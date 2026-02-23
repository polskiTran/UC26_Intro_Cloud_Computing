import os
import socket
from collections import Counter
from typing import List, Tuple


def word_count(text: str) -> int:
    """
    Counts the number of words in a given text.

    Args:
        text (str): The input text.

    Returns:
        int: The number of words in the text.
    """
    words = text.split()
    return len(words)


def top_words(text: str, n: int) -> List[Tuple[str, int]]:
    """
    Returns the top n most frequent words in a given text.

    Args:
        text (str): The input text.
        n (int): The number of top words to return.

    Returns:
        List[str]: A list of the top n most frequent words.
    """
    words = text.split()
    word_counts = Counter(words)
    return word_counts.most_common(n)


def load_text(file_path: str) -> str:
    """
    Loads the text from a file.

    Args:
        file_path (str): The path to the file.

    Returns:
        str: The text content of the file.
    """
    with open(file_path, "r") as file:
        return file.read()


def sanitize_text(text: str) -> str:
    """
    Sanitizes the text by converting it to lowercase and removing punctuation.

    Args:
        text (str): The input text.

    Returns:
        str: The sanitized text.
    """
    symbols = [".", ",", "!", "?", "'", '"', "(", ")", ";", ":"]
    for symbol in symbols:
        text = text.replace(symbol, "")
    return text.lower()


def handle_contraction(text: str) -> str:
    """
    Handles contractions in the text.

    Args:
        text (str): The input text.

    Returns:
        str: The text with contractions handled.
    """
    contractions = {
        "n't": " not",
        "'re": " are",
        "'s": " is",
        "'m": " am",
        "'ve": " have",
        "'ll": " will",
        "'d": " would",
    }
    for contraction, replacement in contractions.items():
        text = text.replace(contraction, replacement)
    return text


def construct_summary(
    IF_WORDS_COUNT: int,
    ARUTW_WORDS_COUNT: int,
    IF_TOP_WORDS: List[Tuple[str, int]],
    ARUTW_TOP_WORDS: List[Tuple[str, int]],
    LOCAL_IP_ADDRESS: str,
) -> str:
    """
    Constructs a summary of the results.

    Args:
        IF_WORDS_COUNT (int): The word count of the IF text.
        ARUTW_WORDS_COUNT (int): The word count of the ARUTW text.
        IF_TOP_WORDS (List[str]): The top words of the IF text.
        ARUTW_TOP_WORDS (List[str]): The top words of the ARUTW text.
        LOCAL_IP_ADDRESS (str): The local IP address.

    Returns:
        str: The summary of the results.
    """
    summary = "=" * 50 + "\n"
    summary += "              RESULTS SUMMARY\n"
    summary += "=" * 50 + "\n\n"

    summary += "1. WORD COUNT STATISTICS\n"
    summary += "-" * 50 + "\n"
    summary += f"  IF Words Count     : {IF_WORDS_COUNT}\n"
    summary += f"  ARUTW Words Count  : {ARUTW_WORDS_COUNT}\n"
    summary += f"  Total Words Count  : {IF_WORDS_COUNT + ARUTW_WORDS_COUNT}\n\n"

    summary += "2. TOP WORDS\n"
    summary += "-" * 50 + "\n"
    summary += f"  IF Top Words       : {IF_TOP_WORDS}\n"
    summary += f"  ARUTW Top Words    : {ARUTW_TOP_WORDS}\n\n"

    summary += "3. SYSTEM INFORMATION\n"
    summary += "-" * 50 + "\n"
    summary += f"  Local IP Address   : {LOCAL_IP_ADDRESS}\n\n"

    summary += "=" * 50 + "\n"
    summary += "              END OF REPORT\n"
    summary += "=" * 50 + "\n"
    return summary


def get_id_address() -> str:
    """
    Returns the IP address of the local machine.

    Returns:
        str: The IP address of the local machine.
    """
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # simulate connection to a external server
        s.connect(("8.8.8.8", 80))
        IP = s.getsockname()[0]
    except Exception:
        IP = "127.0.0.1"
    finally:
        s.close()
    return IP


if __name__ == "__main__":
    DATA_PATH = "/home/data"
    # local testing
    # DATA_PATH = "data"

    IF_FILE_PATH_1 = DATA_PATH + "/IF.txt"
    ARUTW_FILE_PATH_2 = DATA_PATH + "/AlwaysRememberUsThisWay.txt"

    # 0. load and sanitize text
    IF_TEXT = load_text(IF_FILE_PATH_1)
    ARUTW_TEXT = load_text(ARUTW_FILE_PATH_2)
    IF_TEXT = sanitize_text(IF_TEXT)
    ARUTW_TEXT = sanitize_text(ARUTW_TEXT)

    # 1. get words count from text files
    IF_WORDS_COUNT = word_count(IF_TEXT)
    ARUTW_WORDS_COUNT = word_count(ARUTW_TEXT)

    # 2. get top words from IF text file
    IF_TOP_WORDS = top_words(IF_TEXT, 3)

    # 3. handle contraction of ARUTW text file and get top words
    ARUTW_TEXT = handle_contraction(ARUTW_TEXT)
    ARUTW_TOP_WORDS = top_words(ARUTW_TEXT, 3)

    # 4. get IP address of local machine
    LOCAL_IP_ADDRESS = get_id_address()

    # 5. print results
    results = construct_summary(
        IF_WORDS_COUNT,
        ARUTW_WORDS_COUNT,
        IF_TOP_WORDS,
        ARUTW_TOP_WORDS,
        LOCAL_IP_ADDRESS,
    )
    print(results)

    # 6. print result to an output file
    # create folder if not exists
    if not os.path.exists(f"{DATA_PATH}/output"):
        os.makedirs(f"{DATA_PATH}/output")
    with open(f"{DATA_PATH}/output/result.txt", "w") as f:
        f.write(results)
