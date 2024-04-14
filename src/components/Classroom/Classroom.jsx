import React, { useState, useEffect } from "react";
import "./Classroom.css";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import MobileHeader from "../partials/Header/MobileHeader";
import Header from "../partials/Header/Header";
import FooterNav from "../partials/FooterNav/FooterNav";
import { getDateFromTimestamp, getTimeFromTimestamp } from "../../utilities";
import Discussion from "./Discussion";
import Assignments from "./Assignments";
import Attendees from "./Attendees";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import VideocamIcon from "@material-ui/icons/Videocam";
import DuoIcon from "@material-ui/icons/Duo";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { Button } from "reactstrap";
import CreateAssignment from "./CreateAssignment";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectUserData } from "../../reduxSlices/authSlice";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import Calendar from "./Calendar";

const Classroom = () => {
  const storeData = useSelector(selectUserData);
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const classCode = useParams().id;
  const [className, setClassName] = useState();
  const [adminName, setAdminName] = useState();
  const [adminEmail, setAdminEmail] = useState();
  const [classYear, setClassYear] = useState();
  const [subject, setSubject] = useState();
  const [meetLink, setMeetLink] = useState();
  const [reminders, setReminders] = useState([]);
  const [seeAll, setSeeAll] = useState(false);
  const [activeTab, setActiveTab] = useState(useParams().tab);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [show, setShow] = useState(false);
  const toggle = () => setShow((prevState) => !prevState);
  const [loading, setLoading] = useState(false);
  const [isAssignmentCreated, setIsAssignmentCreated] = useState(false);
  const [reminderLoading, setReminderLoading] = useState(false);
  const [checkTA, setCheckTA] = useState(false);

  useEffect(() => {
    if (!activeTab) setActiveTab("discussion");
    if (activeTab === "discussion") {
      navigate("/classes/" + classCode);
    } else if (activeTab === "assignments") {
      navigate("/classes/" + classCode + "/assignments");
    } else if (activeTab === "attendees") {
      navigate("/classes/" + classCode + "/attendees");
    } else if (activeTab === "calendar") {
      navigate("/classes/" + classCode + "/calendar");
    }
  }, [activeTab]);
  const toggle_dropdown = () => setDropdownOpen((prevState) => !prevState);
  useEffect(() => {
    const getClassroom = async () => {
      setLoading(true);
      axios
        .post(
          "https://ocms-backend.vercel.app/classes/getClassroom",
          {
            classCode: classCode,
          },
          { headers: { Authorization: "Bearer " + storeData.token } }
        )
        .then((res) => {
          setClassName(res.data?.className);
          setAdminName(res.data?.adminName);
          setAdminEmail(res.data?.adminEmail);
          setClassYear(res.data?.classLevel);
          setSubject(res.data?.fieldName);
          setMeetLink(res.data?.meetLink);
          setLoading(false);
          setCheckTA(
            res.data?.TAs?.includes(storeData.userEmail) ? true : false
          );
        })
        .catch((err) => {
          console.log(err.response);
          setLoading(false);
          navigate("/classes");
        });
    };
    getClassroom();
  }, []);

  useEffect(() => {
    const getReminders = async () => {
      if (storeData.token) {
        setReminderLoading(true);
        axios
          .post(
            "https://ocms-backend.vercel.app/classes/getReminders",
            {
              userEmail: storeData.userEmail,
            },
            { headers: { Authorization: "Bearer " + storeData.token } }
          )
          .then(async (res) => {
            let reminders = [];
            for (let reminder of res.data) {
              await axios
                .post("https://ocms-backend.vercel.app/classes/getClassroom", {
                  classCode: reminder.classCode,
                })
                .then((classDetails) => {
                  reminders.push({
                    ...reminder,
                    className: classDetails.data.className,
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
            setReminders(reminders);
            setReminderLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setReminderLoading(false);
          });
      }
    };
    getReminders();
  }, [storeData.token]);

  const deleteClass = () => {
    axios
      .delete(
        "https://ocms-backend.vercel.app/classes/deleteClassroom",
        {
          data: { classCode: classCode },
        },
        { headers: { Authorization: "Bearer " + storeData.token } }
      )
      .then((res) => {
        console.log("deleted");
        navigate("/classes");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <>
      {!loading ? (
        <div className="Classroom">
          <div className="d-none d-md-block">
            <Header />
          </div>
          <div className="d-block d-md-none">
            <MobileHeader />
          </div>
          <div className="row m-0 justify-content-center">
            <div className="Classroom_Info col-11 col-md-10 col-lg-9 col-xl-8 d-flex justify-content-between content-box mt-4 py-2 px-2 py-sm-3 px-sm-4">
              <div className="d-flex">
                <div className="Horizontal_Line"></div>
                <div className="d-flex flex-column">
                  <div>
                    <h2 className="ClassName ms-1">{className}</h2>
                  </div>
                  <div className="d-flex Classroom_Desc">
                    <div className="Side_Border">{adminName}</div>
                    <div className="Side_Border">{classYear}</div>
                    <div>{subject}</div>
                  </div>
                  <div className="flex-row justify-center items-center">
                    <div className="Class_Code mt-4 mb-2">
                      Class Code - <b>{classCode}</b>
                    </div>
                  </div>
                  <div className="flex-row justify-center items-center ">
                   

                  {(adminName===storeData.userName)?( <Link to={"/classes/" + classCode + "/classtimings"}
                     className="btn btn-primary m-2">Set Class Timings</Link>):""}
                    
                    {(adminName===storeData.userName)?( <Link to={"/classes/" + classCode + "/createTAs"}
                     className="btn btn-primary">Set Class TAs</Link>):""}
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column justify-content-between">
                {adminName === storeData.userName ? (
                  <Dropdown
                    className="me-2"
                    isOpen={dropdownOpen}
                    toggle={toggle_dropdown}
                  >
                    <DropdownToggle nav>
                      <MoreHorizIcon />
                    </DropdownToggle>
                    <DropdownMenu
                      className="bg-transparent"
                      style={{ border: "none" }}
                    >
                      <button className="join-create-btn" onClick={deleteClass}>
                        Delete Classroom
                      </button>
                    </DropdownMenu>
                  </Dropdown>
                ) : (
                  ""
                )}
                <Link to={meetLink} target="_blank">
                  <VideocamIcon
                    style={{ fontSize: 38, marginLeft: "10px", color: "gray" }}
                  />
                </Link>
              </div>
            </div>
            <div className="col-11 col-md-10 col-lg-9 col-xl-8">
              <div className="row d-flex">
                <div className="d-flex justify-content-between Classroom_Navtab mt-3">
                  <div
                    onClick={() => setActiveTab("discussion")}
                    className={activeTab === "discussion" ? "active" : ""}
                  >
                    Discussion
                  </div>
                  <div
                    onClick={() => setActiveTab("assignments")}
                    className={activeTab === "assignments" ? "active" : ""}
                  >
                    Assignments
                  </div>
                  <div
                    onClick={() => setActiveTab("attendees")}
                    className={activeTab === "attendees" ? "active" : ""}
                  >
                    Attendees
                  </div>
                  <div
                    onClick={() => setActiveTab("calendar")}
                    className={activeTab === "calendar" ? "active" : ""}
                  >
                    Calendar
                  </div>
                </div>
              </div>
              <div className="row justify-content-between mt-3">
                <div className="Classroom_Body m-0 p-0">
                  {activeTab === "discussion" ? (
                    <Discussion adminEmail={adminEmail} classCode={classCode} />
                  ) : activeTab === "assignments" ? (
                    <Assignments
                    checkTA={checkTA}
                      setIsAssignmentCreated={setIsAssignmentCreated}
                      isAssignmentCreated={isAssignmentCreated}
                      classCode={classCode}
                      adminEmail={adminEmail}
                    />
                  ) : activeTab === "attendees" ? (
                    <Attendees
                      classCode={classCode}
                      adminName={adminName}
                      adminEmail={adminEmail}
                    />
                  ) : activeTab === "calendar" ? (
                    <Calendar classCode={classCode} />
                  ) : null}
                </div>
                <div className="Reminders">
                  <div className="content-box py-3 px-2 px-md-4 py-md-3 mb-3">
                    <h6 className="ms-1">Reminders</h6>
                    {reminders
                      .slice(0, seeAll ? reminders.length : 3)
                      .map((reminder, index) => {
                        let style = {};
                        if (
                          index !== reminders.length - 1 &&
                          !(!seeAll && index === 2)
                        ) {
                          style.borderBottom = "1px solid #ccc";
                        }
                        return (
                          <a
                            key={reminder._id}
                            href={
                              "/classes/" +
                              reminder.classCode +
                              "/assignment/" +
                              reminder._id
                            }
                          >
                            <div
                              className="d-flex flex-column Reminder px-2 py-2 py-md-3"
                              style={style}
                            >
                              <div className="Reminder_className">
                                {reminder.className}
                              </div>
                              <div className="Reminder_name">
                                {reminder.name}
                              </div>
                              <div className="Reminder_Desc">
                                {getTimeFromTimestamp(reminder.dueDate)} -{" "}
                                {getDateFromTimestamp(reminder.dueDate)}
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    {reminderLoading ? (
                      <div className="d-flex justify-content-center mt-3">
                        <CircularProgress size={30} />
                      </div>
                    ) : reminders.length > 3 ? (
                      <div className="See_All d-flex justify-content-end">
                        {seeAll ? (
                          <div onClick={() => setSeeAll(false)}>See Less</div>
                        ) : (
                          <div onClick={() => setSeeAll(true)}>See All</div>
                        )}
                      </div>
                    ) : reminders.length === 0 ? (
                      <div
                        className="ms-1 mt-2"
                        style={{ fontSize: "13px", color: "gray" }}
                      >
                        No work due!
                      </div>
                    ) : null}
                  </div>
                  {adminName === storeData.userName ? (
                    <div className="flex">
                      <div className="d-flex  justify-content-center">
                        <Button
                          outline
                          color="primary"
                          className="Button_Hover d-flex align-items-center py-2 px-3 fs-6"
                          onClick={() => setShow(true)}
                        >
                          <AddRoundedIcon
                            style={{ fontSize: "28px", margin: "-2px 3px 0 0" }}
                          />
                          Create Assignment
                        </Button>
                      </div>
                      <div className="d-flex justify-content-center mt-4">
                        <Button
                          // to="https://mirotalkp2p-1drvgf4p.b4a.run/"
                          onClick={() =>
                            window.open(
                              "https://mirotalkp2p-1drvgf4p.b4a.run/",
                              "_blank"
                            )
                          }
                          outline
                          color="primary"
                          className="Button_Hover d-flex align-items-center py-2 px-3 fs-6"
                        >
                          <DuoIcon
                            style={{ fontSize: "28px", margin: "-2px 3px 0 0" }}
                          />
                          Start a Live Class
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="d-block d-md-none">
            <FooterNav />
          </div>
          <CreateAssignment
            setIsAssignmentCreated={setIsAssignmentCreated}
            classCode={classCode}
            isModalOpen={show}
            toggleModal={toggle}
            setShow={setShow}
          />
        </div>
      ) : (
        <div
          className="col-12 d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <CircularProgress size={80} className="display-block" />
        </div>
      )}
    </>
  );
};

export default Classroom;
