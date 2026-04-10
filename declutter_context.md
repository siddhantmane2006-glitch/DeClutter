# Context: "DeClutter" Application Specs & Features

*Below is the exact context of the app we built. Paste this directly into your other Antigravity window to give the AI complete understanding of the product so it can build the perfect landing page.*

---

## 1. Core Value Proposition
**DeClutter** is a blazing-fast, pure-Python Windows desktop application that instantly organizes chaotic folders, documents, and downloads using an ultra-lightweight localized AI engine. It operates completely disconnected from the cloud and requires zero heavy ML dependencies, making it blisteringly fast and 100% private.

## 2. The User Experience
- **Instant Trigger:** Integrated natively into the Windows Context Menu. The user just right-clicks blindly on a messy folder, messy desktop, or specific highlighted files, and clicks **"DeClutter My Files"**. 
- **The UI:** Instantly, a hyper-minimalist, frameless application window appears (styled like a crisp Coinbase interface). Instead of executing blindly, it shows a highly readable "Diff" view.
- **Total Control:** The user sees the old gibberish name and exactly what the AI proposes to rename it to, plus the new destination folder. They can type inline to tweak the name, uncheck files to skip them, or hit "Apply Changes" to execute everything in milliseconds. Safe, reversible, and fully localized.

## 3. The "Super Smart" Hybrid AI Engine
We designed a custom `SmarterFastClassifier` that achieves the semantic depth of a deep learning model without the 10-second loading overhead, yielding 0.01s scan times.

**Key Intellectual Features:**
1. **Intelligent NLP Renamer**: It doesn't just guess names. It actively reads the first 1500 characters of a file.
    - If it's a resume, it extracts the exact candidate name: `Resume_John_Doe.pdf`.
    - If it's an invoice, it surgically rips the Invoice ID and dates: `Invoice_X392_2024-04-10.pdf`.
    - If it's an abstract or essay, it extracts the exact title from the header.
2. **Code Safety Engine**: It respects developers. It refuses to rename already well-named files. During bulk directory scans, it completely ignores `.py`, `.js`, and other code files so it never accidentally destroys a software project structure. If a user *does* explicitly want a code file renamed, it uses AST-like regex to figure out the class/function inside and realistically names it (e.g., `revenue_calculator.py`).
3. **Multi-Modal Vision & OCR**:
    - **Screenshots:** Integrated with Tesseract OCR. If a user screenshots a website or notes, it extracts the text and names the file after the first coherent header (e.g. `What_Is_Photosynthesis.jpg`).
    - **Raw Photos:** Natively falls back to a HuggingFace Vision Transformer (ViT) to look at photographs that lack text. It classifies the visual objects directly, renaming a DSC_00993.jpg to `Photo_Golden_Retriever.jpg`.

## 4. Why it's special (Landing Page Selling Points)
- **Zero-Latency:** Processes 200 files in under 1 second. No waiting for PyTorch or massive LLMs to boot up in the background.
- **100% Private (Local AI):** Files never leave the machine. Financial invoices, proprietary code, and personal photos are mapped entirely on local silicon.
- **Smart Protection:** It knows the difference between a messy download titled `file_001` (which it renames) and `final_tax_return.pdf` (which it preserves automatically).
- **Undo Integration:** A full state-rollback exists natively. If the user regrets a massive bulk sort, one click reverts all files out of their sorted folders and back to the mess exactly as it was.
