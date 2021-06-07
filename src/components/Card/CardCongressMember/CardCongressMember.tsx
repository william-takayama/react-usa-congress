import React, { useCallback, useState } from "react";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { congressService } from "../../../services/congress.service";
import { Chamber } from "../../../types/Congress";
import { CongressMemberDetail } from "../../../types/CongressMemberDetail";
import { LeavingOfficeMember } from "../../../types/CongressMemberLeavingOffice";
import { Member } from "../../../types/CongressMembers";
import { Button } from "../../Button/Button";
import { ModalMemberDetails } from "../../ModalMemberDetails/ModalMemberDetails";
import { Spacing } from "../../Spacing/Spacing";
import { Typography } from "../../Typography/Typography";
import { Card, CardContent } from "../Card";

const SOCIAL_MEDIAS: ReadonlyArray<{
  key:
    | Member["facebook_account"]
    | Member["youtube_account"]
    | Member["twitter_account"];
  icon: JSX.Element;
  baseUrl: string;
}> = [
  {
    key: "facebook_account",
    icon: <FaFacebook size={20} color="black" />,
    baseUrl: "https://facebook.com/",
  },
  {
    key: "youtube_account",
    icon: <FaYoutube size={20} color="black" />,
    baseUrl: "https://youtube.com/",
  },
  {
    key: "twitter_account",
    icon: <FaTwitter size={20} color="black" />,
    baseUrl: "https://twitter.com/",
  },
];

export function CardCongressMember({
  member,
  session,
  chamber,
}: {
  member: Member;
  session: number;
  chamber: Chamber;
}) {
  return (
    <>
      <Link
        to={{
          pathname: `/member/${member.id}`,
          search: `?chamber=${chamber}&session=${session}`,
        }}
      >
        <Card height={90} color="var(--color-x-contrast)" data-role="button">
          <CardContent alignDirection="column">
            <Typography type="body-heading">
              <b>Fullname:</b> {member.first_name} {member.last_name}
            </Typography>

            <Typography type="body-heading">
              <b>Gender:</b> {member.gender === "F" ? "Female" : "Male"}
            </Typography>

            <Typography type="body-heading">
              <b>State:</b> {member.state}
            </Typography>
          </CardContent>

          <CardContent justifyContent="flex-end">
            {SOCIAL_MEDIAS.map((media) => {
              if (member[media.key as keyof Member] == null) {
                return undefined;
              }
              return (
                <Button
                  key={media.key}
                  size="xx-small"
                  bordered={false}
                  style={{ background: "transparent" }}
                  href={`${media.baseUrl}/${member[media.key as keyof Member]}`}
                >
                  {media.icon}
                </Button>
              );
            })}
          </CardContent>
        </Card>
      </Link>

      <Spacing type="block" size="x-small" />
    </>
  );
}
