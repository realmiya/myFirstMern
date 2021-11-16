import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './cardSection.scss';
import { Rate } from 'antd';
import 'antd/dist/antd.css';
import { FiSun } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";

export default function CardSection() {
    const [shiftData, setShiftData] = useState([]);
    const [allHospitals, setAllHospitals] = useState([]);
    const [thisWeekShift, setThisWeekShift] = useState([]);
    const [nextWeekShift, setNextWeekShift] = useState([]);
    const [showThisWeek, setShowThisWeek] = useState(true);
    const [todayDate, setTodayDate] = useState("");
    const [weekEndDate, setWeekEndDate] = useState("");
    const [newWeekStartDate, setNewWeekStartDate] = useState("");
    const [newWeekEndDate, setNewWeekEndDate] = useState("");


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

    function getCurrentWeekShift() {
        setShowThisWeek(true);
        const weekShiftArray = [];
        for (let eachShift = 0; eachShift < shiftData.length; eachShift++) {
            const newDateofShift = new Date(shiftData[eachShift].date)
            const newToday = new Date();
            const todaystr = JSON.stringify(newToday);
            const today = new Date(todaystr.split("T")[0]);
            const DateDiff = newDateofShift - today;
            if (DateDiff <= 604800000 && DateDiff >= 86400000) {
                weekShiftArray.push(shiftData[eachShift]);
            };
        }
        setThisWeekShift(weekShiftArray);
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

    function getNextWeekShift() {
        setShowThisWeek(false);
        const nextWeekShiftArray = [];
        console.log("final" + shiftData.length)
        for (let eachShift = 0; eachShift < shiftData.length; eachShift++) {
            const newDateofShift = new Date(shiftData[eachShift].date)
            const newToday = new Date();
            const todaystr = JSON.stringify(newToday);
            const today = new Date(todaystr.split("T")[0]);
            const DateDiff = newDateofShift - today;
            if (691200000 <= DateDiff && DateDiff <= 1209600000) {
                nextWeekShiftArray.push(shiftData[eachShift]);
            };
        }
        setNextWeekShift(nextWeekShiftArray);
    }

    function getDate() {
        function getWantedStr(input) {
            const inputArray = input.toString().split(" ");
            const ProcessedDate = `${inputArray[1]} ${inputArray[2]} ${inputArray[3]}`;
            return ProcessedDate
        }
        const newToday = new Date();
        setTodayDate(getWantedStr(newToday));
        const oneWeekLater = new Date();
        oneWeekLater.setDate(newToday.getDate() + 6);
        setWeekEndDate(getWantedStr(oneWeekLater))
        const newWeekDate = new Date();
        newWeekDate.setDate(newToday.getDate() + 7);
        setNewWeekStartDate(getWantedStr(newWeekDate))
        const newWeekEnd = new Date();
        newWeekEnd.setDate(newToday.getDate() + 13);
        setNewWeekEndDate(getWantedStr(newWeekEnd))
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
            getDate()
        }, [shiftData])

    useEffect(
        () => {

            if (showThisWeek) {
                getCurrentWeekShift()

            } else {
                getNextWeekShift()
            }
        }, [shiftData])





    return (
        <>
            <div className="weekNav">

                <button onClick={() => {
                    getCurrentWeekShift()
                }}
                    className="navBtn"><FiChevronLeft /></button>
                {showThisWeek ? <div className="currentDate">{todayDate} - {weekEndDate}</div> :
                    <div className="currentDate">{newWeekStartDate} - {newWeekEndDate}</div>}


                <button onClick={() => {
                    getNextWeekShift()

                }}
                    className="navBtn"><FiChevronRight /></button>
            </div>
            {showThisWeek ? thisWeekShift.map((each, index) => {
                return (
                    <>
                        <div key={`${each} ${index}`} className="CardWrapper">
                            <div key={each.shiftId} className="timeCard">
                                <div className="date">
                                    <div className="weekday">{getWeekday(each)}</div>
                                    <div>{eachDateStr(each)}</div>
                                    <div className="icon"> {getTimeIcon(each)}</div>
                                </div>
                                <div className="time">
                                    {getTime(each)}

                                </div>

                                <div className="type">{getType(each)}</div>
                                <div className="pay">{getPay(each)}</div>

                            </div>

                            <div className="hospitalCard">
                                {getCertainHospitalDetail(each.hospital_id)}
                                <div className="applyButton">APPLY</div>
                            </div>

                        </div>
                    </>
                )
            })
                : nextWeekShift.map((each, index) => {
                    return (
                        <>
                            <div key={`${each} ${index}`} className="CardWrapper">
                                <div key={each.shiftId} className="timeCard">
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
                                    <div className="applyButton">APPLY</div>
                                </div>

                            </div>
                        </>
                    )
                })
            }
        </>
    )
}
