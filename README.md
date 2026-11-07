# Fieldnote
A personal Chrome research companion. Highlight a passage to compare it with your project brief, or find exact protein identifiers in an imported CSV/TSV. The synthetic example works immediately. No build step or account needed.

**Install:** Open chrome://extensions, enable Developer mode, click Load unpacked, and choose the folder containing manifest.json. Use Fieldnote → Open project & demo to try it. Activate “Assist on this tab” on a regular HTML page or webmail message.

**Free by default:** Record lookup and shared-term comparison run locally. Optional Ollama interpretation runs on your own machine. See [the setup guide](START-HERE.txt).

**Optional Kimi K3:** Get a Moonshot **Open Platform** API key from https://platform.kimi.ai. In the installed extension’s project desk, expand “Optional hosted reasoning · Kimi K3”, enter the key and enable it. After selecting and comparing a passage, click “Send to Kimi K3”. This sends up to 4,000 characters of selected text and 6,000 of your saved brief, including any sensitive content in those inputs. It does not upload your imported dataset, page URL or inbox. Billing is through your Moonshot account. No automatic calls or retries. Use Disconnect to forget the key; it is stored in trusted extension session storage and does not persist across browser restarts. Never commit keys or research data.

The service worker calls https://api.moonshot.ai/v1/chat/completions with model kimi-k3 and high reasoning effort. The standalone HTML demo does not use hosted models. Only the final answer is displayed; verify scientific interpretations against their sources.

**Files:** core.js handles parsing and matching; assist.js displays in-page offers; desk.* manages project settings; popup.* activates the extension; worker.js handles optional model calls. This repository contains synthetic data only.
