import { NavLink } from "react-router-dom";
import styles from "./administrator.module.css";

const Sidebar: React.FunctionComponent = () => {
  return (
    <>
      <ul className={styles.sidebar}>
        <li className="my-1 block">
          <NavLink
            to="/administration"
            className={({ isActive }) =>
              isActive ? styles.active : styles.nav_ui_link
            }
            end
          >
            <i className="pi pi-angle-double-right pr-2"></i>
            Division
          </NavLink>
        </li>
        <li className="my-1 block">
          <NavLink
            to="/administration/external-role"
            className={({ isActive }) =>
              isActive ? styles.active : styles.nav_ui_link
            }
            end
          >
            <i className="pi pi-angle-double-right pr-2"></i>
            External Role
          </NavLink>
        </li>
        <li className="my-1 block">
          <NavLink
            to="/administration/file-column"
            className={({ isActive }) =>
              isActive ? styles.active : styles.nav_ui_link
            }
            end
          >
            <i className="pi pi-angle-double-right pr-2"></i>
            File Column
          </NavLink>
        </li>
        <li className="my-1 block">
          <NavLink
            to="/administration/file-type"
            className={({ isActive }) =>
              isActive ? styles.active : styles.nav_ui_link
            }
            end
          >
            <i className="pi pi-angle-double-right pr-2"></i>
            Import File Type
          </NavLink>
        </li>
        <li className="my-1 block">
          <NavLink
            to="/administration/notification"
            className={({ isActive }) =>
              isActive ? styles.active : styles.nav_ui_link
            }
            end
          >
            <i className="pi pi-angle-double-right pr-2"></i>
            Notification Type
          </NavLink>
        </li>
        <li className="my-1 block">
          <NavLink
            to="/administration/project"
            className={({ isActive }) =>
              isActive ? styles.active : styles.nav_ui_link
            }
            end
          >
            <i className="pi pi-angle-double-right pr-2"></i>
            Project Type
          </NavLink>
        </li>
        <li className="my-1 block">
          <NavLink
            to="/administration/question-type"
            className={({ isActive }) =>
              isActive ? styles.active : styles.nav_ui_link
            }
          >
            <i className="pi pi-angle-double-right pr-2"></i>
            Question Type
          </NavLink>
        </li>
        <li className="my-1 block">
          <NavLink
            to="/administration/questions"
            className={({ isActive }) =>
              isActive ? styles.active : styles.nav_ui_link
            }
          >
            <i className="pi pi-angle-double-right pr-2"></i>
            Question
          </NavLink>
        </li>
        <li className="my-1 block">
          <NavLink
            to="/administration/possible-response"
            className={({ isActive }) =>
              isActive ? styles.active : styles.nav_ui_link
            }
          >
            <i className="pi pi-angle-double-right pr-2"></i>
            Posssible Response
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default Sidebar;
