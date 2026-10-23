"""
Example: Fallback to an automated Darija / French Voice Call
if an SMS OTP has not been verified within 45 seconds.
"""

import os
import time
from vext_voice import VextClient

client = VextClient(api_key=os.getenv("VEXT_API_KEY", "vext_live_key"))

def trigger_voice_otp_fallback(phone_number: str, otp_code: str):
    print(f"[OTP Fallback] SMS pending for {phone_number}. Triggering voice call...")

    # Reads digits in natural Darija phonetics (e.g. 4-9-2-1)
    call = client.dispatch_call(
        to=phone_number,
        agent="kenza",
        language="darija",
        context={
            "otp_code": otp_code,
            "security_action": "login_verification"
        }
    )

    print(f"[OTP Fallback] Call initiated: {call.get('call_id')}")

if __name__ == "__main__":
    trigger_voice_otp_fallback("+212661234567", "9482")
