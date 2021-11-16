import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './inviteSection.scss';
import { Rate } from 'antd';
import 'antd/dist/antd.css';
import { FiSun } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";

export default function InviteSection() {

    const [invitedShiftIdArray, setInvitedShiftIdArray] = useState([]);
    const [shiftData, setShiftData] = useState([]);
    const [allHospitals, setAllHospitals] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [userID, setUserID] = useState("");
    const [myDetail, setMyDetail] = useState({});
    const [inviteDetails, setInviteDetails] = useState([])


    function inputHandler(e) {
        e.preventDefault();
        setUserID(e.target.value);

    }
    function getWeekday(each) {
        const eachDate = new Date(each.date);
        const weekNumber = eachDate.getDay();
        const weekdayArray = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
        const currentWeekday = `${weekdayArray[weekNumber]}`;
        return currentWeekday;
    }

    function eachDateStr(each) {
        const splitEach = each.date.split(" ", 2);
        const NeedDate = splitEach[0] + " " + splitEach[1];
        return NeedDate
    }

    function getTime(each) {
        const time = each.time;
        return time

    }

    function getType(each) {
        const type = each.type;
        return type

    }
    function getPay(each) {
        const pay = each.pay;
        return pay

    }
    function getTimeIcon(each) {
        const timestr = getTime(each)
        const signal = timestr.slice(5, 7);
        const afternoonTimeClock = timestr.slice(1, 2);
        return (

            <div>
                {signal == 'AM' && <FiSun />}
                {signal == 'PM' && afternoonTimeClock > 6 && <FiMoon />}
                {signal == 'PM' && afternoonTimeClock < 6 && <FiSunset />}

            </div>
        )

    }


    async function getShift() {
        try {
            const allShift = await axios.get('http://localhost:5000/api/shifts');
            setShiftData(allShift.data);
        } catch (err) {
            console.log(err + "allShiftError")
        }
    }

    async function getAllHospital() {
        try {
            const allHospitalsRes = await axios.get('http://localhost:5000/api/hospitals');
            setAllHospitals(allHospitalsRes.data);

        } catch (err) {
            console.log(err + "Hospital Server Err ")
        }
    }

    async function getAllUsers() {
        try {
            const allUsersRes = await axios.get('http://localhost:5000/api/users');
            setAllUsers(allUsersRes.data);
        } catch (err) {

            console.log(err + "users Server Err ")
        }
    }


    function getUserDetail(userid) {
        for (let u = 0; u < allUsers.length; u++) {
            if (allUsers[u].id == userid) {
                setMyDetail(allUsers[u])

            }
        }
    }

    function getInvitedShiftIdArray() {
        const UserShiftIdArray = []
        for (let each = 0; each < myDetail.invited.length; each++) {
            const invited = myDetail.invited[each].shiftId;
            UserShiftIdArray.push(invited)

        }
        setInvitedShiftIdArray(UserShiftIdArray)
    }

    function showInvitedCard() {
        const invites = []
        for (let u = 0; u < invitedShiftIdArray.length; u++) {
            shiftData.map((each) => {
                if (each.shiftId == invitedShiftIdArray[u]) {
                    invites.push(each)
                }

            })
        }
        setInviteDetails(invites)


    }



    function getCertainHospitalDetail(hospitalID) {
        const numberHospitalId = parseInt(hospitalID);
        const name = allHospitals[numberHospitalId].hospitalName;
        const add = allHospitals[numberHospitalId].address;
        const rate = allHospitals[numberHospitalId].reviewStar;
        const addLine1 = add.split(",")[0];
        const addLine2 = add.split(",")[1];
        return (

            <div className="hospitalText">
                <div className="hospitalName">{name}</div>
                <div className="hospitalRate"><Rate disabled defaultValue={rate} /></div>
                <div className="address">{addLine1}</div>
                <div className="address">{addLine2}</div>
            </div>
        )
    }

    useEffect(
        () => {
            getAllHospital()
        }, [])

    useEffect(
        () => {
            getShift()
        }, [allHospitals])
    useEffect(
        () => {
            getAllUsers()
        }, [])

    return (
        <>

            <div className="checkUserInvitation">
                <div className="reminder">input your userId to check your invitation:</div>
                <input
                    type="text"
                    onChange={inputHandler}
                />
                <button className="styledBtn" onClick={() => { getUserDetail(userID) }}>confirm my userID</button>
                <button className="styledBtn" onClick={() => { getInvitedShiftIdArray() }}>check whether i have been invited</button>

            </div>
            {invitedShiftIdArray.length > 0 &&
                <>
                    <div className="inviteText">
                        <div className="subtitle">You've been invited :)</div>
                    </div>
                    <button className="styledBtn" onClick={() => { showInvitedCard() }}>Show My invited shift card</button>
                </>

            }
            {inviteDetails.map((each, index) => {
                return (
                    <>

                        <div key={`${each} ${index}`} className="CardWrapper">
                            <div key={each.shiftId} className="InviteTimeCard">
                                <div className="date">
                                    <div className="weekday">{getWeekday(each)}</div>
                                    <div>{eachDateStr(each)}</div>
                                    <div className="icon"> {getTimeIcon(each)}</div>
                                </div>
                                <div className="time">{getTime(each)}</div>
                                <div className="type">{getType(each)}</div>
                                <div className="pay">{getPay(each)}</div>

                            </div>

                            <div className="hospitalCard">
                                {getCertainHospitalDetail(each.hospital_id)}
                                <div className="btn--decline">DECLINE</div>
                                <div className="btn">APPLY</div>
                            </div>

                        </div>
                    </>
                )
            })}
        </>


    )
}
