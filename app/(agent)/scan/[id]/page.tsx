import QRScannerPage from "@/hooks/Scan-Components";

export default function ScannerPage({ params }: { params: { id: string } }) {
  return (
    <div className="pt-20">
      <QRScannerPage produitId={params.id} />
    </div>
  );
}
