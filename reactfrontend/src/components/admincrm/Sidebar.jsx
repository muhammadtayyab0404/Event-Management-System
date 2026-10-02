import React from "react";
import { NavLink, useNavigate } from "react-router-dom";


const menuItems = [
  {
    name: "Overview",
    path: "/crm/admin",
  },
  {
    name: "Events",
    path: "/crm/admin/events",
  },
  {
    name: "Users / Clients",
    path: "/crm/admin/users",
  },
  {
    name: "Managers",
    path: "/crm/admin/managers",
  },
  {
    name: "Final results",
    path: "/crm/admin/results",
  },
];


export default function Sidebar() {


  const navigate = useNavigate();


  const handleLogout = () => {

    localStorage.removeItem("crm_token");
    localStorage.removeItem("crm_user");

    navigate("/crm/login");

  };



  return (

    <aside className="rhnx-sidebar">


      <div className="rhnx-brand">


        <div className="rhnx-logo">
          RH
        </div>


        <div>

          <h3>
            RH Nexus
          </h3>

          <span>
            EVENTS CRM
          </span>

        </div>


      </div>





      <p className="rhnx-workspace">
        ADMIN WORKSPACE
      </p>






      <nav className="rhnx-menu">


        {
          menuItems.map((item)=>(

            <NavLink

              key={item.path}

              to={item.path}

              end={item.path === "/crm/admin"}

              className={({isActive}) =>
                isActive ? "active" : ""
              }

            >

              {item.name}

            </NavLink>

          ))
        }


      </nav>







      <div className="rhnx-bottom">


        <NavLink to="/crm/admin/export">

          Export records

        </NavLink>




        <button onClick={handleLogout}>

          Sign out

        </button>


      </div>



    </aside>

  );

}