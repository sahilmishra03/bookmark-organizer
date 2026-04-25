"use client";
import { ImagesBadge } from "@/components/ui/images-badge";

export default function ImagesBadgeDemoTwo() {
  return (
    <div className="flex w-full ">
      <ImagesBadge
        text="Introducing Bookmark-Organizer"
        images={[
          "/dashboard.png",
          "/dashboard-phone.png",
          "/dashboard-copy.png",
        ]}
        folderSize={{ width: 38, height: 26 }}
        teaserImageSize={{ width: 30, height: 24 }}
        hoverImageSize={{ width: 120, height: 68 }}
        hoverTranslateY={-80}
        hoverSpread={50}
      />
    </div>
  );
}
