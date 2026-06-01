import { LaunchDetailPageClient } from "@/features/launches/components/launch-detail-page-client";

interface LaunchDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function LaunchDetailPage({
  params,
}: LaunchDetailPageProps) {
  const { id } = await params;

  return <LaunchDetailPageClient launchId={id} />;
}
