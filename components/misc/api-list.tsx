"use client";

import { useParams } from "next/navigation";
import { useOrigin } from "@/lib/hooks/use-origin";
import { APIAlert } from "@/components/misc/api-alert";

type APIListProps = {
  entityName: string;
  entityIdName: string;
};

export const APIList = ({ entityName, entityIdName }: APIListProps) => {
  const params = useParams();

  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <APIAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />

      <APIAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />

      <APIAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />

      <APIAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />

      <APIAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
};
