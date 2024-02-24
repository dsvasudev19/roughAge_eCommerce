import { FC } from "react";
import { useLocation } from "react-router-dom";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";

const EnquiryHeader: FC = () => {
  const location = useLocation();

  return (
    <>
      <ToolbarWrapper />
    </>
  );
};

export { EnquiryHeader };
