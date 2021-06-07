import React from "react";
import { CongressMemberDetail } from "../../types/CongressMemberDetail";
import { LeavingOfficeMember } from "../../types/CongressMemberLeavingOffice";
import { BottomSheet } from "../BottomSheet/BottomSheet";
import { Typography } from "../Typography/Typography";
import { MapContainer, TileLayer } from "react-leaflet";

export function ModalMemberDetails({
  officeLocation,
  details,
  isVisible,
  onClose,
}: {
  officeLocation: LeavingOfficeMember | undefined;
  details: CongressMemberDetail;
  isVisible: boolean;
  onClose: () => void;
}) {
  return (
    <BottomSheet id="member-details" onDismiss={onClose} isVisible={isVisible}>
      <Typography type="heading3">Member Details</Typography>

      <Typography type="body">
        {details.first_name} {details.last_name}
      </Typography>

      <Typography type="body">
        {details.first_name} {details.last_name}
      </Typography>

      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        placeholder={<MapPlaceholder />}
      >
        <TileLayer
          //@ts-ignore
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </BottomSheet>
  );
}

function MapPlaceholder() {
  return (
    <p>
      Map of London.{" "}
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  );
}
