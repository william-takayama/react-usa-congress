import { parse } from "query-string";
import React, { useEffect, useMemo, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MapContainer, TileLayer } from "react-leaflet";
import { Link, useLocation, useParams } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { Spacing } from "../../components/Spacing/Spacing";
import { Typography } from "../../components/Typography/Typography";
import mapInfo from "../../constants/map.json";
import { congressService } from "../../services/congress.service";
import { Chamber } from "../../types/Congress";
import { CongressMemberDetail } from "../../types/CongressMemberDetail";
import { LeavingOfficeMember } from "../../types/CongressMemberLeavingOffice";
import classes from "./MemberDetails.module.scss";

export function MemberDetails() {
  const { id } = useParams<any>();
  const location = useLocation<Record<string, any>>();

  const queryString = useMemo(
    () => parse(location.state.search),
    [location.state.search]
  );

  const [details, setDetails] = useState<CongressMemberDetail | undefined>();
  const [officeLocation, setOfficeLocation] =
    useState<LeavingOfficeMember | undefined>();

  useEffect(() => {
    async function getMemberInfo() {
      const [memberDetails, membersOfficeLocation] = await Promise.all([
        congressService.getMember(id),
        congressService.getMemberLeavingOffice(
          Number(queryString?.session),
          queryString?.chamber as Chamber
        ),
      ]);

      const nOfficeLocation = membersOfficeLocation?.find((m) => m.id === id);

      setDetails(memberDetails);
      setOfficeLocation(nOfficeLocation);
    }

    getMemberInfo();
  }, [id, queryString?.chamber, queryString?.session]);

  const [latitude, longitude] = useMemo(() => {
    const info = mapInfo.find(
      (state) => state.prefix === officeLocation?.state
    );

    return [info?.latitude, info?.longitude];
  }, [officeLocation?.state]);

  if (details == null) {
    return <Loader />;
  }

  return (
    <>
      <div className={classes.headerContainer}>
        <Link to="/">
          <FaArrowLeft size={20} color="white" />
        </Link>

        <Spacing type="inline" size="x-small" />

        <Typography type="heading1" size={40}>
          Member Details
        </Typography>
      </div>

      <Typography type="body">
        <b>Fullname:</b> {details.first_name} {details.last_name}{" "}
        {officeLocation ? `- State: ${officeLocation.state}` : ""}
      </Typography>

      <Typography type="body">
        <b>Born in:</b> {details.date_of_birth}
      </Typography>

      <Typography type="body">
        <b>Gender:</b> {details.gender === "M" ? "Male" : "Female"}
      </Typography>

      <Spacing type="block" size="x-small" />

      {latitude && longitude ? (
        <MapContainer
          center={[latitude, longitude]}
          zoom={10}
          scrollWheelZoom={false}
          placeholder={<MapPlaceholder />}
        >
          <TileLayer
            //@ts-ignore
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      ) : null}
    </>
  );
}

function MapPlaceholder() {
  return (
    <p>
      Map. <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  );
}
