# Website content inputs

Place PDFs, Markdown files, and plain-text files directly in this folder. The build currently recognizes these exact inputs:

- `abstract-status-incentives-and-career-motivation.md` or `.txt` updates the expandable abstract on the Research page.
- `cv-maharnab-naha.pdf` activates the CV link on the About page and is published at `/uploads/cv-maharnab-naha.pdf`.

Replace an existing file without changing its name, then run `npm run build`. The website output will use the updated content automatically.

The recognized files are tracked by Git because a GitHub-based build must be able to read them. Do not place private information in these files.

Other files remain ignored and private until they are explicitly connected to a page and added to the approved list in `.gitignore`.
