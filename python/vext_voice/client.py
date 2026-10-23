import hmac
import hashlib
from typing import Any, Dict, Optional
import requests

class VextClient:
    def __init__(self, api_key: str, base_url: str = "https://api.envoisms.ma", timeout: float = 15.0):
        if not api_key:
            raise ValueError("VextClient: api_key is required.")
        self.api_key = api_key
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self.session = requests.Session()
        self.session.headers.update({
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "User-Agent": "vext-voice-python/1.0.0",
        })

    def dispatch_call(
        self,
        to: str,
        agent: str = "kenza",
        language: str = "darija",
        context: Optional[Dict[str, Any]] = None,
        callback_url: Optional[str] = None,
        channel: str = "whatsapp",
    ) -> Dict[str, Any]:
        """
        Trigger an automated outbound phone call speaking native Darija or French.
        """
        payload = {
            "to": to,
            "agent_name": agent,
            "language": language,
            "context": context or {},
            "callback_url": callback_url,
            "channel": channel,
        }
        res = self.session.post(f"{self.base_url}/v1/vext/calls/dispatch", json=payload, timeout=self.timeout)
        res.raise_for_status()
        return res.json()

    def get_wallet_balance(self) -> Dict[str, Any]:
        """
        Check your current EnvoiSMS prepaid MAD balance.
        """
        res = self.session.get(f"{self.base_url}/api/vext/tenant-config/me", timeout=self.timeout)
        res.raise_for_status()
        return res.json()

    @staticmethod
    def verify_webhook_signature(raw_body: bytes, signature_header: str, secret_key: str) -> bool:
        """
        Verify HMAC SHA-256 signature from Vext callbacks.
        """
        if not signature_header:
            return False
        signature = signature_header.split("=")[-1]
        expected = hmac.new(secret_key.encode("utf-8"), raw_body, hashlib.sha256).hexdigest()
        return hmac.compare_digest(signature, expected)
