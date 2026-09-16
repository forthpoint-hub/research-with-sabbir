import Button from "@/components/ui/Button";
import { ResearchItem } from "@/types/content";

export default function ResearchAction({ item }: { item: ResearchItem }) {
  if (item.type === "free") {
    if (!item.pdfUrl) {
      return (
        <p className="text-sm text-paper-dim">
          PDF not uploaded yet — add it to /public/reports/ and set pdfUrl in
          data/research.ts.
        </p>
      );
    }
    return (
      <Button href={item.pdfUrl} external>
        Download free PDF
      </Button>
    );
  }

  if (!item.externalUrl) {
    return (
      <p className="text-sm text-paper-dim">
        Checkout link not set yet — add externalUrl in data/research.ts.
      </p>
    );
  }

  return (
    <Button href={item.externalUrl} external>
      Buy report
    </Button>
  );
}
