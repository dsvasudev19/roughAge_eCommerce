import { useIntl } from "react-intl";
import { KTIcon } from "../../../../helpers";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItem } from "./SidebarMenuItem";

const SidebarMenuMain = () => {
  const intl = useIntl();

  return (
    <>
      <SidebarMenuItem
        to="/dashboard"
        icon="element-11"
        title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
        fontIcon="bi-app-indicator"
      />
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Manage
          </span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to="/vendor"
        title="Vendor"
        icon="profile-circle"
        fontIcon="bi-person"
      >
        <SidebarMenuItem
          to="/vendor/vendors"
          title="Vendors"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/vendor/add-vendor"
          title="Add Vendor"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to="/product"
        title="Product"
        fontIcon="bi-sticky"
        icon="cross-circle"
      >
        <SidebarMenuItem
          to="/product/products"
          title="Products"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/product/add-product"
          title="Add Product"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItem
        to="/booking/bookings"
        title="Bookings"
        icon="cross-circle"
      />
      {/* </SidebarMenuItemWithSub> */}
      <SidebarMenuItem
        to="/enquiry/enquiries"
        title="Enquiries"
        fontIcon="bi-sticky"
        icon="cross-circle"
      ></SidebarMenuItem>
      {/* <SidebarMenuItemWithSub
        to="/review"
        title="Review"
        fontIcon="bi-sticky"
        icon="cross-circle"
      > */}
      <SidebarMenuItem
        to="/review/reviews"
        title="Reviews"
        icon="dots-square"
        // hasBullet={true}
      />
      {/* </SidebarMenuItemWithSub> */}
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Settings
          </span>
        </div>
      </div>

      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Apps
          </span>
        </div>
      </div>
      <SidebarMenuItem
        to="/apps/user-management/users"
        icon="abstract-28"
        title="User management"
        fontIcon="bi-layers"
      />
      <SidebarMenuItem
        to="/apps/user-support/enquiries"
        icon="abstract-28"
        title="Customer Support"
        fontIcon="bi-layers"
      />
    </>
  );
};

export { SidebarMenuMain };
