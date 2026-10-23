from setuptools import setup, find_packages

setup(
    name="vext-voice",
    version="1.0.0",
    description="Official Python SDK for Vext Voice AI Gateway (Moroccan Darija & French Voice Telephony)",
    author="Vext Telecommunications",
    author_email="engineering@vext.ma",
    url="https://github.com/abdnaouri/vext-voice-sdk",
    packages=find_packages(),
    install_requires=["requests>=2.28.0"],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.8",
)
