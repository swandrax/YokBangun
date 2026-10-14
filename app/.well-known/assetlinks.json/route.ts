import { NextResponse } from "next/server";

const assetLinks = [
  {
    relation: ["delegate_permission/common.handle_all_urls"],
    target: {
      namespace: "android_app",
      package_name: "id.yokbangun.app",
      sha256_cert_fingerprints: [
        "9C:3D:07:58:29:B2:00:4B:BA:1B:64:98:9D:3A:53:09:41:FE:00:AE:1C:1D:14:75:63:2D:AE:36:11:DD:DC:04",
      ],
    },
  },
];

export function GET() {
  return NextResponse.json(assetLinks, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
