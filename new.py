from youtube_transcript_api import YouTubeTranscriptApi
import re

def extract_video_id(url):
    match = re.search(r"(?:v=|\/)([0-9A-Za-z_-]{11})", url)
    return match.group(1) if match else None

def get_transcript(video_url):
    video_id = extract_video_id(video_url)

    if not video_id:
        print("❌ Invalid YouTube URL")
        return

    try:
        api = YouTubeTranscriptApi()
        transcript = api.fetch(video_id)

        print("\n--- Transcript ---\n")
        for entry in transcript:
            print(entry.text)

    except Exception as e:
        print("❌ Error:", str(e))


print("✅ Script started")

video_url = input("Enter YouTube URL: ").strip()
get_transcript(video_url)

print("\n✅ Done")