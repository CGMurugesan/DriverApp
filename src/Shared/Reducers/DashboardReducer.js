import moment from "moment";

import {
  API_CANCEL_VISIT,
  API_CANCEL_VISIT_SUCCESS,
  API_CANCEL_VISIT_FAIL,
  API_EVALUATE_EVENT,
  API_EVALUATE_EVENT_SUCCESS,
  API_EVALUATE_EVENT_FAIL,
  API_EVENING_VISIT_OPTION,
  API_EVENING_VISIT_OPTION_SUCCESS,
  API_EVENING_VISIT_OPTION_FAIL,
  API_GET_VISIT_DETAILS,
  API_GET_VISIT_DETAILS_SUCCESS,
  API_GET_VISIT_DETAILS_FAIL,
  API_MORNING_VISIT_OPTION,
  API_MORNING_VISIT_OPTION_SUCCESS,
  API_MORNING_VISIT_OPTION_FAIL,
  API_POSTPONE_VISIT,
  API_POSTPONE_VISIT_FAIL,
  API_POSTPONE_VISIT_SUCCESS,
  API_SEND_MESSAGE,
  API_SEND_MESSAGE_SUCCESS,
  API_SEND_MESSAGE_FAIL,
  API_UPDATE_END_DATE,
  API_UPDATE_END_DATE_SUCCESS,
  API_UPDATE_END_DATE_FAIL,
  API_UPDATE_REACH_CLIENT,
  API_UPDATE_REACH_CLIENT_SUCCESS,
  API_UPDATE_REACH_CLIENT_FAIL,
  API_UPDATE_START_DATE,
  API_UPDATE_START_DATE_SUCCESS,
  API_UPDATE_START_DATE_FAIL,
  API_GET_CANCEL_REASONS,
  API_GET_CANCEL_REASONS_FAIL,
  API_GET_CANCEL_REASONS_SUCCESS,
  API_UPDATE_TRIP_START_DATE,
  API_UPDATE_TRIP_START_DATE_SUCCESS,
  API_UPDATE_TRIP_START_DATE_FAIL,
  API_UPDATE_TRIP_END_DATE,
  API_UPDATE_TRIP_END_DATE_SUCCESS,
  API_UPDATE_TRIP_END_DATE_FAIL,
  CARD_VIEW_TOGGLE,
  API_VISIT_ID_UPDATED,
  API_UPDATE_DRIVES_STATUS,
  API_ALERT_UPDTED,
  GET_API_ALERT_UPDTED,
  API_PICK_UP_VISIT,
  API_PICK_UP_VISIT_SUCCESS,
  API_PICK_UP_VISIT_FAIL
} from "../ActionTypes/index";
import Constant from "../../Constant/Constant";

const initialState = {
  morningVisitData: [],
  eveningVisitData: [],
  getVisitDetailData: [],
  cardView: false,
  updatedvisit: "",
  getdriverstatus: 1,
  alertmessagestatus: "",
  sendResponce: "",
  updateEndDateres: "",
  getholdtripdata: "",
  getpickupdata: "",
  getEditAddress:"",
  loaderresponce:false
};

export const DashboardReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case API_CANCEL_VISIT:
      return { ...state };
    case API_CANCEL_VISIT_SUCCESS:
      return { ...state, getcancelVisit: action.payload.data };
    case API_CANCEL_VISIT_FAIL:
      return { ...state, getcancelVisit: action.error };
    case API_EVALUATE_EVENT:
      return { ...state,loaderresponce:true };
    case API_EVALUATE_EVENT_SUCCESS:
      return { ...state,getEditAddress:action.payload.data,loaderresponce:false };
    case API_EVALUATE_EVENT_FAIL:
      return { ...state ,loaderresponce:false};
    case API_EVENING_VISIT_OPTION:
      return { ...state };
    case API_EVENING_VISIT_OPTION_SUCCESS:
      let eveningData = [];
      if (action.payload) {
        const { data } = action.payload;
        if (data) {
          eveningData = data;
        }
      }
      return { ...state, eveningVisitData: eveningData };
    case API_EVENING_VISIT_OPTION_FAIL:
      return { ...state };
    case API_GET_VISIT_DETAILS:
      return { ...state };
    case API_GET_VISIT_DETAILS_SUCCESS:
      let getVisit = [];
      if (action.payload) {
        const { data } = action.payload;
        if (data) {
          getVisit = data.Data.content[0]
          // getVisit =  {
          //   "VisitID": "bb6ee2e8-8a6e-ef11-a670-000d3adeaa4a",
          //   "VisitTime": 100000000,
          //   "VisitStatus": 100000004,
          //   "VisitPeriod": 4,
          //   "LaborName": "RHEA MAMON MALONES",
          //   "LaborPhoto": null,
          //   "LaborPhone": "576935914",
          //   "VisitDate": "2024-10-31T08:00:00",
          //   "VisitActualStart": "2024-10-31T09:16:09",
          //   "VisitShelter": "Rayan Shelter - JETK",
          //   "RequestNumber": "JRS000485158",
          //   "AddressID": "f46f8085-b185-ef11-ac20-002248a116b9",
          //   "NeighbourhoodName": "ALRABWA",
          //   "Latitude": "24.695915190790146",
          //   "Longitude": "46.752945150468896",
          //   "ConfirmedLocation": true,
          //   "PreferedPhone": "0558603266",
          //   "EmergancyPhone": "0558603262",
          //   "CustomerName": "melhem",
          //   "DistanceToCurrentLoc": 2.86,
          //   "VisitIndex": 1,
          //   "ActualStartString": "10/31/2024 9:16:09 AM",
          //   "VisitName": "JV001050812",
          //   "VisitDay": "Thursday",
          //   "WorkerName": "RHEA MAMON MALONES",
          //   "CustomerRate": 5,
          //   "CustomerNote": null,
          //   "ActualArrivalTime": "2024-10-31T13:18:35",
          //   "VisitStartTime": "2024-10-31T09:15:46",
          //   "ActualStartTime": "2024-11-05T22:16:09",
          //   "ActualEndTime": "2024-10-31T13:18:35",
          //   "CarNumber": "RRY-11",
          //   "VisitDuration": "4 hours",
          //   "Status": 100000005,
          //   "PeriodID": 100000000,
          //   "TimeID": 100000000,
          //   "CanCancel": false,
          //   "CanReschedule": false,
          //   "LastReschduleDate": "0001-01-01T00:00:00",
          //   "RequestID": null,
          //   "VisitsChanges": 0,
          //   "CanSendAsGift": false,
          //   "MobilePhone": null,
          //   "ClientAddress": null,
          //   "CustomerLatitude": null,
          //   "CustomerLongitude": null
          // }
        }
      }
      console.log(getVisit,"cal this id");
      return { ...state, getVisitDetailData: getVisit };``
    case API_GET_VISIT_DETAILS_FAIL:
      return { ...state };
    case API_MORNING_VISIT_OPTION:
      return { ...state };
    case API_MORNING_VISIT_OPTION_SUCCESS:
      let morningData = [];
      if (action.payload) {
        const { data } = action.payload;
      //   const  data  =  
      //   {
      //     "ContentEncoding": null,
      //     "ContentType": null,
      //     "Data": {
      //         "status": true,
      //         "code": 200,
      //         "message": "Fisit Loaded successfully",
      //         "content": {
      //             "PendingVisits": {
      //                 "WaitingVisit": 0,
      //                 "UnderDelivery": 0,
      //                 "UnderProcessing": 0,
      //                 "Finished": 0,
      //                 "Cancelled": 0,
      //                 "VisitList": []
      //             },
      //             "MorningVisits": {
      //                 "WaitingVisit": 0,
      //                 "UnderDelivery": 0,
      //                 "UnderProcessing": 0,
      //                 "Finished": 7,
      //                 "Cancelled": 0,
      //                 "VisitList": [
      //                     {
      //                         "VisitID": "82b45063-56a0-ef11-8a69-7c1e523556dc",
      //                         "VisitTime": 100000000,
      //                         "VisitStatus": 100000005,
      //                         "VisitPeriod": 4,
      //                         "LaborName": "GLADYS MAGPATOC GALO",
      //                         "LaborPhoto": null,
      //                         "LaborPhone": "576910564",
      //                         "VisitDate": "2024-11-12T00:00:00",
      //                         "VisitActualStart": "2024-11-12T08:34:32",
      //                         "VisitShelter": "MUNSIYAH Shelter - JETK",
      //                         "RequestNumber": "HCR016773",
      //                         "AddressID": "9d9309e4-ec7b-ef11-ac20-7c1e52373081",
      //                         "NeighbourhoodName": "ALREMAL",
      //                         "Latitude": "24.8489982",
      //                         "Longitude": "46.8180465",
      //                         "ConfirmedLocation": false,
      //                         "PreferedPhone": "0538481192",
      //                         "EmergancyPhone": "0538481192",
      //                         "CustomerName": "أحلام الشلوي",
      //                         "DistanceToCurrentLoc": 5.09,
      //                         "VisitIndex": 1,
      //                         "ActualStartString": "11/12/2024 8:34:32 AM",
      //                         "VisitName": "1",
      //                         "VisitDay": "Tuesday",
      //                         "WorkerName": "GLADYS MAGPATOC GALO",
      //                         "CustomerRate": 0,
      //                         "CustomerNote": null,
      //                         "ActualArrivalTime": "2024-11-12T12:35:56",
      //                         "VisitStartTime": "2024-11-12T08:25:05",
      //                         "ActualStartTime": "2024-11-12T08:34:32",
      //                         "ActualEndTime": "2024-11-12T12:35:56",
      //                         "CarNumber": "RMU-09",
      //                         "VisitDuration": "4 hours",
      //                         "Status": 100000005,
      //                         "PeriodID": 100000000,
      //                         "TimeID": 100000000,
      //                         "CanCancel": false,
      //                         "CanReschedule": false,
      //                         "LastReschduleDate": "0001-01-01T00:00:00",
      //                         "RequestID": null,
      //                         "VisitsChanges": 0,
      //                         "CanSendAsGift": false,
      //                         "MobilePhone": null,
      //                         "ClientAddress": null,
      //                         "CustomerLatitude": null,
      //                         "CustomerLongitude": null
      //                     },
      //                     {
      //                         "VisitID": "4f99e734-208e-ef11-ac20-000d3adeae6d",
      //                         "VisitTime": 100000000,
      //                         "VisitStatus": 100000005,
      //                         "VisitPeriod": 4,
      //                         "LaborName": "DAISY MAE BARCENAS",
      //                         "LaborPhoto": null,
      //                         "LaborPhone": "576084305",
      //                         "VisitDate": "2024-11-12T07:54:05",
      //                         "VisitActualStart": "2024-11-12T08:22:28",
      //                         "VisitShelter": "MUNSIYAH Shelter - JETK",
      //                         "RequestNumber": "HCR011735",
      //                         "AddressID": "274735bd-2a79-ef11-a670-7c1e52348f2c",
      //                         "NeighbourhoodName": "ALREMAL",
      //                         "Latitude": "24.883163357119184",
      //                         "Longitude": "46.84067912369396",
      //                         "ConfirmedLocation": false,
      //                         "PreferedPhone": "500632819",
      //                         "EmergancyPhone": "0500632819",
      //                         "CustomerName": "Fahad Almutairi",
      //                         "DistanceToCurrentLoc": 8.96,
      //                         "VisitIndex": 2,
      //                         "ActualStartString": "11/12/2024 8:22:28 AM",
      //                         "VisitName": "1",
      //                         "VisitDay": "Tuesday",
      //                         "WorkerName": "DAISY MAE BARCENAS",
      //                         "CustomerRate": 5,
      //                         "CustomerNote": "احتاج هذه العاملة في كل الزيارات ",
      //                         "ActualArrivalTime": "2024-11-12T12:23:37",
      //                         "VisitStartTime": "2024-11-12T08:12:41",
      //                         "ActualStartTime": "2024-11-12T08:22:28",
      //                         "ActualEndTime": "2024-11-12T12:23:37",
      //                         "CarNumber": "RMU-09",
      //                         "VisitDuration": "4 hours",
      //                         "Status": 100000005,
      //                         "PeriodID": 100000000,
      //                         "TimeID": 100000000,
      //                         "CanCancel": false,
      //                         "CanReschedule": false,
      //                         "LastReschduleDate": "0001-01-01T00:00:00",
      //                         "RequestID": null,
      //                         "VisitsChanges": 0,
      //                         "CanSendAsGift": false,
      //                         "MobilePhone": null,
      //                         "ClientAddress": null,
      //                         "CustomerLatitude": null,
      //                         "CustomerLongitude": null
      //                     },
      //                     {
      //                         "VisitID": "e4dd2dd8-af75-ef11-a670-000d3adf729e",
      //                         "VisitTime": 100000000,
      //                         "VisitStatus": 100000005,
      //                         "VisitPeriod": 4,
      //                         "LaborName": "MILAVIC PARMEROLA",
      //                         "LaborPhoto": null,
      //                         "LaborPhone": "576379151",
      //                         "VisitDate": "2024-11-12T00:00:00",
      //                         "VisitActualStart": "2024-11-12T08:49:48",
      //                         "VisitShelter": "MUNSIYAH Shelter - JETK",
      //                         "RequestNumber": "JRS000400665",
      //                         "AddressID": "8bed6004-801f-ef11-95d1-c13f2eab301c",
      //                         "NeighbourhoodName": "ALREMAL",
      //                         "Latitude": "24.8486425",
      //                         "Longitude": "46.798433",
      //                         "ConfirmedLocation": false,
      //                         "PreferedPhone": "0553581946",
      //                         "EmergancyPhone": "0553581946",
      //                         "CustomerName": "فهد فهد",
      //                         "DistanceToCurrentLoc": 3.22,
      //                         "VisitIndex": 2,
      //                         "ActualStartString": "11/12/2024 8:49:48 AM",
      //                         "VisitName": "JV000787968",
      //                         "VisitDay": "Tuesday",
      //                         "WorkerName": "MILAVIC PARMEROLA",
      //                         "CustomerRate": 0,
      //                         "CustomerNote": null,
      //                         "ActualArrivalTime": "2024-11-12T12:52:57",
      //                         "VisitStartTime": "2024-11-12T08:45:57",
      //                         "ActualStartTime": "2024-11-12T08:49:48",
      //                         "ActualEndTime": "2024-11-12T12:52:57",
      //                         "CarNumber": "RMU-09",
      //                         "VisitDuration": "4 hours",
      //                         "Status": 100000005,
      //                         "PeriodID": 100000000,
      //                         "TimeID": 100000000,
      //                         "CanCancel": false,
      //                         "CanReschedule": false,
      //                         "LastReschduleDate": "0001-01-01T00:00:00",
      //                         "RequestID": null,
      //                         "VisitsChanges": 0,
      //                         "CanSendAsGift": false,
      //                         "MobilePhone": null,
      //                         "ClientAddress": null,
      //                         "CustomerLatitude": null,
      //                         "CustomerLongitude": null
      //                     },
      //                     {
      //                         "VisitID": "586be077-4986-ef11-ac20-000d3ad95ef0",
      //                         "VisitTime": 100000000,
      //                         "VisitStatus": 100000005,
      //                         "VisitPeriod": 4,
      //                         "LaborName": "CAREN OCCENA PALMARES",
      //                         "LaborPhoto": null,
      //                         "LaborPhone": "578285259",
      //                         "VisitDate": "2024-11-12T00:00:00",
      //                         "VisitActualStart": "2024-11-12T08:11:58",
      //                         "VisitShelter": "MUNSIYAH Shelter - JETK",
      //                         "RequestNumber": "HCR008543",
      //                         "AddressID": "5521208d-4586-ef11-ac20-000d3ab06484",
      //                         "NeighbourhoodName": "alremaal2",
      //                         "Latitude": "24.9305006",
      //                         "Longitude": "46.8186405",
      //                         "ConfirmedLocation": true,
      //                         "PreferedPhone": "0566277886",
      //                         "EmergancyPhone": "0566277886",
      //                         "CustomerName": "منيرة العتيبي",
      //                         "DistanceToCurrentLoc": 12.11,
      //                         "VisitIndex": 3,
      //                         "ActualStartString": "11/12/2024 8:11:58 AM",
      //                         "VisitName": "5",
      //                         "VisitDay": "Tuesday",
      //                         "WorkerName": "CAREN OCCENA PALMARES",
      //                         "CustomerRate": 5,
      //                         "CustomerNote": "أبيه تجني زياره قدمه ",
      //                         "ActualArrivalTime": "2024-11-12T12:14:07",
      //                         "VisitStartTime": "2024-11-12T08:04:02",
      //                         "ActualStartTime": "2024-11-12T08:11:58",
      //                         "ActualEndTime": "2024-11-12T12:14:07",
      //                         "CarNumber": "RMU-09",
      //                         "VisitDuration": "4 hours",
      //                         "Status": 100000005,
      //                         "PeriodID": 100000000,
      //                         "TimeID": 100000000,
      //                         "CanCancel": false,
      //                         "CanReschedule": false,
      //                         "LastReschduleDate": "0001-01-01T00:00:00",
      //                         "RequestID": null,
      //                         "VisitsChanges": 0,
      //                         "CanSendAsGift": false,
      //                         "MobilePhone": null,
      //                         "ClientAddress": null,
      //                         "CustomerLatitude": null,
      //                         "CustomerLongitude": null
      //                     },
      //                     {
      //                         "VisitID": "bb814e01-ab81-ef11-ac20-7c1e523746fe",
      //                         "VisitTime": 100000000,
      //                         "VisitStatus": 100000005,
      //                         "VisitPeriod": 4,
      //                         "LaborName": "GINA MARIE BARTIZO",
      //                         "LaborPhoto": null,
      //                         "LaborPhone": "576654983",
      //                         "VisitDate": "2024-11-12T17:24:49",
      //                         "VisitActualStart": "2024-11-12T08:54:44",
      //                         "VisitShelter": "MUNSIYAH Shelter - JETK",
      //                         "RequestNumber": "HCR007499",
      //                         "AddressID": "fbdaa0f0-d94c-ee11-9598-c3512c348550",
      //                         "NeighbourhoodName": "ALREMAL",
      //                         "Latitude": "24.84792623763817",
      //                         "Longitude": "46.79909347152389",
      //                         "ConfirmedLocation": false,
      //                         "PreferedPhone": "0503065315",
      //                         "EmergancyPhone": "0503065315",
      //                         "CustomerName": "منيره القحطاني",
      //                         "DistanceToCurrentLoc": 3.22,
      //                         "VisitIndex": 3,
      //                         "ActualStartString": "11/12/2024 8:54:44 AM",
      //                         "VisitName": "5",
      //                         "VisitDay": "Tuesday",
      //                         "WorkerName": "GINA MARIE BARTIZO",
      //                         "CustomerRate": 0,
      //                         "CustomerNote": null,
      //                         "ActualArrivalTime": "2024-11-12T12:53:23",
      //                         "VisitStartTime": "2024-11-12T08:50:18",
      //                         "ActualStartTime": "2024-11-12T08:54:44",
      //                         "ActualEndTime": "2024-11-12T12:53:23",
      //                         "CarNumber": "RMU-09",
      //                         "VisitDuration": "4 hours",
      //                         "Status": 100000005,
      //                         "PeriodID": 100000000,
      //                         "TimeID": 100000000,
      //                         "CanCancel": false,
      //                         "CanReschedule": false,
      //                         "LastReschduleDate": "0001-01-01T00:00:00",
      //                         "RequestID": null,
      //                         "VisitsChanges": 0,
      //                         "CanSendAsGift": false,
      //                         "MobilePhone": null,
      //                         "ClientAddress": null,
      //                         "CustomerLatitude": null,
      //                         "CustomerLongitude": null
      //                     },
      //                     {
      //                         "VisitID": "a354b553-60a0-ef11-8a69-002248a1c57b",
      //                         "VisitTime": 100000000,
      //                         "VisitStatus": 100000005,
      //                         "VisitPeriod": 4,
      //                         "LaborName": "LEAH SOLERA FLORENTINO",
      //                         "LaborPhoto": null,
      //                         "LaborPhone": "576425385",
      //                         "VisitDate": "2024-11-12T00:00:00",
      //                         "VisitActualStart": "2024-11-12T08:44:40",
      //                         "VisitShelter": "MUNSIYAH Shelter - JETK",
      //                         "RequestNumber": "HCR016790",
      //                         "AddressID": "24692608-60a0-ef11-8a6a-000d3ad95ef0",
      //                         "NeighbourhoodName": "ALREMAL",
      //                         "Latitude": "24.85156492189298",
      //                         "Longitude": "46.79821734899198",
      //                         "ConfirmedLocation": true,
      //                         "PreferedPhone": "0568080046",
      //                         "EmergancyPhone": "0546790204",
      //                         "CustomerName": "Fatima Ahmed",
      //                         "DistanceToCurrentLoc": 3.43,
      //                         "VisitIndex": 4,
      //                         "ActualStartString": "11/12/2024 8:44:40 AM",
      //                         "VisitName": "1",
      //                         "VisitDay": "Tuesday",
      //                         "WorkerName": "LEAH SOLERA FLORENTINO",
      //                         "CustomerRate": 0,
      //                         "CustomerNote": null,
      //                         "ActualArrivalTime": "2024-11-12T12:46:28",
      //                         "VisitStartTime": "2024-11-12T08:35:25",
      //                         "ActualStartTime": "2024-11-12T08:44:40",
      //                         "ActualEndTime": "2024-11-12T12:46:28",
      //                         "CarNumber": "RMU-09",
      //                         "VisitDuration": "4 hours",
      //                         "Status": 100000005,
      //                         "PeriodID": 100000000,
      //                         "TimeID": 100000000,
      //                         "CanCancel": false,
      //                         "CanReschedule": false,
      //                         "LastReschduleDate": "0001-01-01T00:00:00",
      //                         "RequestID": null,
      //                         "VisitsChanges": 0,
      //                         "CanSendAsGift": false,
      //                         "MobilePhone": null,
      //                         "ClientAddress": null,
      //                         "CustomerLatitude": null,
      //                         "CustomerLongitude": null
      //                     },
      //                     {
      //                         "VisitID": "130d0df0-3188-ef11-ac20-7c1e5235d25c",
      //                         "VisitTime": 100000000,
      //                         "VisitStatus": 100000005,
      //                         "VisitPeriod": 4,
      //                         "LaborName": "GLESIA GRACE FLORES",
      //                         "LaborPhoto": null,
      //                         "LaborPhone": "576498266",
      //                         "VisitDate": "2024-11-12T00:00:00",
      //                         "VisitActualStart": "2024-11-12T08:03:35",
      //                         "VisitShelter": "MUNSIYAH Shelter - JETK",
      //                         "RequestNumber": "HCR009059",
      //                         "AddressID": "23e5d97c-3e73-ef11-a670-7c1e52378fdf",
      //                         "NeighbourhoodName": "alremaal2",
      //                         "Latitude": "24.93042418636259",
      //                         "Longitude": "46.79204302628558",
      //                         "ConfirmedLocation": false,
      //                         "PreferedPhone": "0581110055",
      //                         "EmergancyPhone": "0581110055",
      //                         "CustomerName": "مها النهدي",
      //                         "DistanceToCurrentLoc": 11.4,
      //                         "VisitIndex": 4,
      //                         "ActualStartString": "11/12/2024 8:03:35 AM",
      //                         "VisitName": "2",
      //                         "VisitDay": "Tuesday",
      //                         "WorkerName": "GLESIA GRACE FLORES",
      //                         "CustomerRate": 0,
      //                         "CustomerNote": null,
      //                         "ActualArrivalTime": "2024-11-12T12:15:04",
      //                         "VisitStartTime": "2024-11-12T08:00:03",
      //                         "ActualStartTime": "2024-11-12T08:03:35",
      //                         "ActualEndTime": "2024-11-12T12:15:04",
      //                         "CarNumber": "RMU-09",
      //                         "VisitDuration": "4 hours",
      //                         "Status": 100000005,
      //                         "PeriodID": 100000000,
      //                         "TimeID": 100000000,
      //                         "CanCancel": false,
      //                         "CanReschedule": false,
      //                         "LastReschduleDate": "0001-01-01T00:00:00",
      //                         "RequestID": null,
      //                         "VisitsChanges": 0,
      //                         "CanSendAsGift": false,
      //                         "MobilePhone": null,
      //                         "ClientAddress": null,
      //                         "CustomerLatitude": null,
      //                         "CustomerLongitude": null
      //                     }
      //                 ]
      //             },
      //             "EveningVisits": {
      //                 "WaitingVisit": 2,
      //                 "UnderDelivery": 2,
      //                 "UnderProcessing": 4,
      //                 "Finished": 0,
      //                 "Cancelled": 0,
      //                 "VisitList": [
      //                     {
      //                         "VisitID": "ea6255e4-c98d-ef11-ac21-000d3ade32dc",
      //                         "VisitTime": 100000001,
      //                         "VisitStatus": 1,
      //                         "VisitPeriod": 4,
      //                         "LaborName": "JOCELYN VILLAR",
      //                         "LaborPhoto": null,
      //                         "LaborPhone": "578480251",
      //                         "VisitDate": "2024-11-12T00:00:00",
      //                         "VisitActualStart": "0001-01-01T00:00:00",
      //                         "VisitShelter": "MUNSIYAH Shelter - JETK",
      //                         "RequestNumber": "HCR011591",
      //                         "AddressID": "1877c4d5-e66e-ef11-a670-000d3a69e88a",
      //                         "NeighbourhoodName": "ALREMAL",
      //                         "Latitude": "24.8336834",
      //                         "Longitude": "46.794952",
      //                         "ConfirmedLocation": false,
      //                         "PreferedPhone": "0570423300",
      //                         "EmergancyPhone": "0570423300",
      //                         "CustomerName": "فهد الشايع",
      //                         "DistanceToCurrentLoc": 2.09,
      //                         "VisitIndex": 1,
      //                         "ActualStartString": null,
      //                         "VisitName": "4",
      //                         "VisitDay": "Tuesday",
      //                         "WorkerName": "JOCELYN VILLAR",
      //                         "CustomerRate": 0,
      //                         "CustomerNote": null,
      //                         "ActualArrivalTime": "2024-11-12T16:34:10.9998099+03:00",
      //                         "VisitStartTime": "2024-11-12T16:34:10.9998099+03:00",
      //                         "ActualStartTime": "2024-11-12T16:34:10.9998099+03:00",
      //                         "ActualEndTime": "2024-11-12T16:34:10.9998099+03:00",
      //                         "CarNumber": "RMU-09",
      //                         "VisitDuration": "4 hours",
      //                         "Status": 1,
      //                         "PeriodID": 100000000,
      //                         "TimeID": 100000001,
      //                         "CanCancel": false,
      //                         "CanReschedule": false,
      //                         "LastReschduleDate": "0001-01-01T00:00:00",
      //                         "RequestID": null,
      //                         "VisitsChanges": 0,
      //                         "CanSendAsGift": false,
      //                         "MobilePhone": null,
      //                         "ClientAddress": null,
      //                         "CustomerLatitude": null,
      //                         "CustomerLongitude": null
      //                     },
      //                     {
      //                         "VisitID": "659c32f3-2387-ef11-ac21-7c1e523746fe",
      //                         "VisitTime": 100000001,
      //                         "VisitStatus": 1,
      //                         "VisitPeriod": 4,
      //                         "LaborName": "LOVELY ROSE OPONE DANLAG",
      //                         "LaborPhoto": null,
      //                         "LaborPhone": null,
      //                         "VisitDate": "2024-11-12T00:00:00",
      //                         "VisitActualStart": "0001-01-01T00:00:00",
      //                         "VisitShelter": "MUNSIYAH Shelter - JETK",
      //                         "RequestNumber": "HCR008788",
      //                         "AddressID": "bf3aab7f-365b-ef11-95d3-de6598a72b0e",
      //                         "NeighbourhoodName": "ALREMAL",
      //                         "Latitude": "24.83748093149446",
      //                         "Longitude": "46.81003039269078",
      //                         "ConfirmedLocation": false,
      //                         "PreferedPhone": null,
      //                         "EmergancyPhone": "0504444812",
      //                         "CustomerName": "العتيبي",
      //                         "DistanceToCurrentLoc": 3.67,
      //                         "VisitIndex": 1,
      //                         "ActualStartString": null,
      //                         "VisitName": "4",
      //                         "VisitDay": "Tuesday",
      //                         "WorkerName": "LOVELY ROSE OPONE DANLAG",
      //                         "CustomerRate": 0,
      //                         "CustomerNote": null,
      //                         "ActualArrivalTime": "2024-11-12T16:34:10.9998099+03:00",
      //                         "VisitStartTime": "2024-11-12T16:34:10.9998099+03:00",
      //                         "ActualStartTime": "2024-11-12T16:34:10.9998099+03:00",
      //                         "ActualEndTime": "2024-11-12T16:34:10.9998099+03:00",
      //                         "CarNumber": "RMU-09",
      //                         "VisitDuration": "4 hours",
      //                         "Status": 1,
      //                         "PeriodID": 100000000,
      //                         "TimeID": 100000001,
      //                         "CanCancel": false,
      //                         "CanReschedule": false,
      //                         "LastReschduleDate": "0001-01-01T00:00:00",
      //                         "RequestID": null,
      //                         "VisitsChanges": 0,
      //                         "CanSendAsGift": false,
      //                         "MobilePhone": null,
      //                         "ClientAddress": null,
      //                         "CustomerLatitude": null,
      //                         "CustomerLongitude": null
      //                     },
      //                     {
      //                         "VisitID": "63812a04-d593-ef11-8a6a-000d3ad95ef0",
      //                         "VisitTime": 100000001,
      //                         "VisitStatus": 100000000,
      //                         "VisitPeriod": 4,
      //                         "LaborName": "ISADORA MAE SABAYLE",
      //                         "LaborPhoto": null,
      //                         "LaborPhone": "578479569",
      //                         "VisitDate": "2024-11-12T00:00:00",
      //                         "VisitActualStart": "0001-01-01T00:00:00",
      //                         "VisitShelter": "MUNSIYAH Shelter - JETK",
      //                         "RequestNumber": "HCR013971",
      //                         "AddressID": "edf679c9-e45a-ef11-bfe3-000d3adf7cb2",
      //                         "NeighbourhoodName": "ALREMAL",
      //                         "Latitude": "24.8445752",
      //                         "Longitude": "46.8159829",
      //                         "ConfirmedLocation": false,
      //                         "PreferedPhone": "0530999251",
      //                         "EmergancyPhone": "0530999251",
      //                         "CustomerName": "Reem Mohammed",
      //                         "DistanceToCurrentLoc": 0.0,
      //                         "VisitIndex": 2,
      //                         "ActualStartString": null,
      //                         "VisitName": "3",
      //                         "VisitDay": "Tuesday",
      //                         "WorkerName": "ISADORA MAE SABAYLE",
      //                         "CustomerRate": 0,
      //                         "CustomerNote": null,
      //                         "ActualArrivalTime": "2024-11-12T16:34:10.9998099+03:00",
      //                         "VisitStartTime": "2024-11-12T16:32:02",
      //                         "ActualStartTime": "2024-11-12T16:34:10.9998099+03:00",
      //                         "ActualEndTime": "2024-11-12T16:34:10.9998099+03:00",
      //                         "CarNumber": "RMU-09",
      //                         "VisitDuration": "4 hours",
      //                         "Status": 100000000,
      //                         "PeriodID": 100000000,
      //                         "TimeID": 100000001,
      //                         "CanCancel": false,
      //                         "CanReschedule": false,
      //                         "LastReschduleDate": "0001-01-01T00:00:00",
      //                         "RequestID": null,
      //                         "VisitsChanges": 0,
      //                         "CanSendAsGift": false,
      //                         "MobilePhone": null,
      //                         "ClientAddress": null,
      //                         "CustomerLatitude": null,
      //                         "CustomerLongitude": null
      //                     },
      //                     {
      //                         "VisitID": "7a3aee3a-759e-ef11-8a69-000d3adeae6d",
      //                         "VisitTime": 100000001,
      //                         "VisitStatus": 100000004,
      //                         "VisitPeriod": 4,
      //                         "LaborName": "AIVE JOY NICOLAS BALDOZA",
      //                         "LaborPhoto": null,
      //                         "LaborPhone": null,
      //                         "VisitDate": "2024-11-12T00:00:00",
      //                         "VisitActualStart": "2024-11-12T15:54:35",
      //                         "VisitShelter": "MUNSIYAH Shelter - JETK",
      //                         "RequestNumber": "HCR016419",
      //                         "AddressID": "5f13ab51-e45a-ef11-bfe3-000d3adf7cb2",
      //                         "NeighbourhoodName": "alremaal2",
      //                         "Latitude": "24.9209719",
      //                         "Longitude": "46.8055168",
      //                         "ConfirmedLocation": false,
      //                         "PreferedPhone": "0500746563",
      //                         "EmergancyPhone": "0500746563",
      //                         "CustomerName": "Reem Alqahtani",
      //                         "DistanceToCurrentLoc": 4000000.0,
      //                         "VisitIndex": 3,
      //                         "ActualStartString": "11/12/2024 3:54:35 PM",
      //                         "VisitName": "1",
      //                         "VisitDay": "Tuesday",
      //                         "WorkerName": "AIVE JOY NICOLAS BALDOZA",
      //                         "CustomerRate": 0,
      //                         "CustomerNote": null,
      //                         "ActualArrivalTime": "2024-11-12T16:34:10.9998099+03:00",
      //                         "VisitStartTime": "2024-11-12T15:38:29",
      //                         "ActualStartTime": "2024-11-12T15:54:35",
      //                         "ActualEndTime": "2024-11-12T16:34:10.9998099+03:00",
      //                         "CarNumber": "RMU-09",
      //                         "VisitDuration": "4 hours",
      //                         "Status": 100000004,
      //                         "PeriodID": 100000000,
      //                         "TimeID": 100000001,
      //                         "CanCancel": false,
      //                         "CanReschedule": false,
      //                         "LastReschduleDate": "0001-01-01T00:00:00",
      //                         "RequestID": null,
      //                         "VisitsChanges": 0,
      //                         "CanSendAsGift": false,
      //                         "MobilePhone": null,
      //                         "ClientAddress": null,
      //                         "CustomerLatitude": null,
      //                         "CustomerLongitude": null
      //                     },
      //                     {
      //                         "VisitID": "1578b5cd-77a0-ef11-8a69-7c1e5235b0db",
      //                         "VisitTime": 100000001,
      //                         "VisitStatus": 100000004,
      //                         "VisitPeriod": 4,
      //                         "LaborName": "EVANIE SUICO",
      //                         "LaborPhoto": null,
      //                         "LaborPhone": "576509847",
      //                         "VisitDate": "2024-11-12T00:00:00",
      //                         "VisitActualStart": "2024-11-12T16:07:32",
      //                         "VisitShelter": "MUNSIYAH Shelter - JETK",
      //                         "RequestNumber": "HCR016828",
      //                         "AddressID": "3eb75dab-e45a-ef11-bfe3-000d3adf7cb2",
      //                         "NeighbourhoodName": "alremaal2",
      //                         "Latitude": "24.923154259871676",
      //                         "Longitude": "46.82342442803827",
      //                         "ConfirmedLocation": false,
      //                         "PreferedPhone": "0598173668",
      //                         "EmergancyPhone": "0598173668",
      //                         "CustomerName": "aldheep",
      //                         "DistanceToCurrentLoc": 4000000.0,
      //                         "VisitIndex": 4,
      //                         "ActualStartString": "11/12/2024 4:07:32 PM",
      //                         "VisitName": "1",
      //                         "VisitDay": "Tuesday",
      //                         "WorkerName": "EVANIE SUICO",
      //                         "CustomerRate": 0,
      //                         "CustomerNote": null,
      //                         "ActualArrivalTime": "2024-11-12T16:34:10.9998099+03:00",
      //                         "VisitStartTime": "2024-11-12T15:56:40",
      //                         "ActualStartTime": "2024-11-12T16:07:32",
      //                         "ActualEndTime": "2024-11-12T16:34:10.9998099+03:00",
      //                         "CarNumber": "RMU-09",
      //                         "VisitDuration": "4 hours",
      //                         "Status": 100000004,
      //                         "PeriodID": 100000000,
      //                         "TimeID": 100000001,
      //                         "CanCancel": false,
      //                         "CanReschedule": false,
      //                         "LastReschduleDate": "0001-01-01T00:00:00",
      //                         "RequestID": null,
      //                         "VisitsChanges": 0,
      //                         "CanSendAsGift": false,
      //                         "MobilePhone": null,
      //                         "ClientAddress": null,
      //                         "CustomerLatitude": null,
      //                         "CustomerLongitude": null
      //                     },
      //                     {
      //                         "VisitID": "75e00660-7591-ef11-8a6a-7c1e5237631b",
      //                         "VisitTime": 100000001,
      //                         "VisitStatus": 100000004,
      //                         "VisitPeriod": 4,
      //                         "LaborName": "RUTH AJAMBO",
      //                         "LaborPhoto": null,
      //                         "LaborPhone": "0577515649",
      //                         "VisitDate": "2024-11-12T00:00:00",
      //                         "VisitActualStart": "2024-11-12T16:15:07",
      //                         "VisitShelter": "MUNSIYAH Shelter - JETK",
      //                         "RequestNumber": "HCR013212",
      //                         "AddressID": "fa87dcac-c88b-ef11-ac20-6045bde0458a",
      //                         "NeighbourhoodName": "alremaal2",
      //                         "Latitude": "24.923079140439288",
      //                         "Longitude": "46.82429574429989",
      //                         "ConfirmedLocation": true,
      //                         "PreferedPhone": "0596043355",
      //                         "EmergancyPhone": "0596043355",
      //                         "CustomerName": "يزن ابو فاره",
      //                         "DistanceToCurrentLoc": 4000000.0,
      //                         "VisitIndex": 5,
      //                         "ActualStartString": "11/12/2024 4:15:07 PM",
      //                         "VisitName": "2",
      //                         "VisitDay": "Tuesday",
      //                         "WorkerName": "RUTH AJAMBO",
      //                         "CustomerRate": 0,
      //                         "CustomerNote": null,
      //                         "ActualArrivalTime": "2024-11-12T16:34:10.9998099+03:00",
      //                         "VisitStartTime": "2024-11-12T16:08:27",
      //                         "ActualStartTime": "2024-11-12T16:15:07",
      //                         "ActualEndTime": "2024-11-12T16:34:10.9998099+03:00",
      //                         "CarNumber": "RMU-09",
      //                         "VisitDuration": "4 hours",
      //                         "Status": 100000004,
      //                         "PeriodID": 100000000,
      //                         "TimeID": 100000001,
      //                         "CanCancel": false,
      //                         "CanReschedule": false,
      //                         "LastReschduleDate": "0001-01-01T00:00:00",
      //                         "RequestID": null,
      //                         "VisitsChanges": 0,
      //                         "CanSendAsGift": false,
      //                         "MobilePhone": null,
      //                         "ClientAddress": null,
      //                         "CustomerLatitude": null,
      //                         "CustomerLongitude": null
      //                     },
      //                     {
      //                         "VisitID": "1dee2dd8-af75-ef11-a670-000d3adf729e",
      //                         "VisitTime": 100000001,
      //                         "VisitStatus": 100000000,
      //                         "VisitPeriod": 4,
      //                         "LaborName": "ELIZABETH APOLO NOBLEZA",
      //                         "LaborPhoto": null,
      //                         "LaborPhone": "578421546",
      //                         "VisitDate": "2024-11-12T00:00:00",
      //                         "VisitActualStart": "0001-01-01T00:00:00",
      //                         "VisitShelter": "MUNSIYAH Shelter - JETK",
      //                         "RequestNumber": "JRS000470254",
      //                         "AddressID": "0610dff8-1dd2-ed11-956f-d68e7615184a",
      //                         "NeighbourhoodName": "ALREMAL",
      //                         "Latitude": "24.8444572",
      //                         "Longitude": "46.8347275",
      //                         "ConfirmedLocation": false,
      //                         "PreferedPhone": "0590288372",
      //                         "EmergancyPhone": "0590288372",
      //                         "CustomerName": "abdulaziz",
      //                         "DistanceToCurrentLoc": 0.0,
      //                         "VisitIndex": 7,
      //                         "ActualStartString": null,
      //                         "VisitName": "JV000992684",
      //                         "VisitDay": "Tuesday",
      //                         "WorkerName": "ELIZABETH APOLO NOBLEZA",
      //                         "CustomerRate": 0,
      //                         "CustomerNote": null,
      //                         "ActualArrivalTime": "2024-11-12T16:34:10.9998099+03:00",
      //                         "VisitStartTime": "2024-11-12T16:28:22",
      //                         "ActualStartTime": "2024-11-12T16:34:10.9998099+03:00",
      //                         "ActualEndTime": "2024-11-12T16:34:10.9998099+03:00",
      //                         "CarNumber": "RMU-09",
      //                         "VisitDuration": "4 hours",
      //                         "Status": 100000000,
      //                         "PeriodID": 100000000,
      //                         "TimeID": 100000001,
      //                         "CanCancel": false,
      //                         "CanReschedule": false,
      //                         "LastReschduleDate": "0001-01-01T00:00:00",
      //                         "RequestID": null,
      //                         "VisitsChanges": 0,
      //                         "CanSendAsGift": false,
      //                         "MobilePhone": null,
      //                         "ClientAddress": null,
      //                         "CustomerLatitude": null,
      //                         "CustomerLongitude": null
      //                     },
      //                     {
      //                         "VisitID": "0de44763-5aa0-ef11-8a69-7c1e523556dc",
      //                         "VisitTime": 100000001,
      //                         "VisitStatus": 100000004,
      //                         "VisitPeriod": 4,
      //                         "LaborName": "JILLY ROSE OLILA LATO",
      //                         "LaborPhoto": null,
      //                         "LaborPhone": "578156645",
      //                         "VisitDate": "2024-11-12T00:00:00",
      //                         "VisitActualStart": "2024-11-12T16:27:51",
      //                         "VisitShelter": "MUNSIYAH Shelter - JETK",
      //                         "RequestNumber": "HCR016781",
      //                         "AddressID": "fd3a0773-9070-ef11-a670-6045bddfd5b4",
      //                         "NeighbourhoodName": "ALREMAL",
      //                         "Latitude": "24.845610910824327",
      //                         "Longitude": "46.83658647569712",
      //                         "ConfirmedLocation": false,
      //                         "PreferedPhone": "0544931973",
      //                         "EmergancyPhone": "0544931973",
      //                         "CustomerName": "alhnouf mohammed",
      //                         "DistanceToCurrentLoc": 4000000.0,
      //                         "VisitIndex": 8,
      //                         "ActualStartString": "11/12/2024 4:27:51 PM",
      //                         "VisitName": "1",
      //                         "VisitDay": "Tuesday",
      //                         "WorkerName": "JILLY ROSE OLILA LATO",
      //                         "CustomerRate": 0,
      //                         "CustomerNote": null,
      //                         "ActualArrivalTime": "2024-11-12T16:34:10.9998099+03:00",
      //                         "VisitStartTime": "2024-11-12T16:15:51",
      //                         "ActualStartTime": "2024-11-12T16:27:51",
      //                         "ActualEndTime": "2024-11-12T16:34:10.9998099+03:00",
      //                         "CarNumber": "RMU-09",
      //                         "VisitDuration": "4 hours",
      //                         "Status": 100000004,
      //                         "PeriodID": 100000000,
      //                         "TimeID": 100000001,
      //                         "CanCancel": false,
      //                         "CanReschedule": false,
      //                         "LastReschduleDate": "0001-01-01T00:00:00",
      //                         "RequestID": null,
      //                         "VisitsChanges": 0,
      //                         "CanSendAsGift": false,
      //                         "MobilePhone": null,
      //                         "ClientAddress": null,
      //                         "CustomerLatitude": null,
      //                         "CustomerLongitude": null
      //                     }
      //                 ]
      //             }
      //         }
      //     },
      //     "JsonRequestBehavior": 1,
      //     "MaxJsonLength": null,
      //     "RecursionLimit": null
      // }
        if (data) {
          morningData = data.Data.content;
        }
      }
      return { ...state, morningVisitData: morningData === null ? [] : morningData};
    case API_MORNING_VISIT_OPTION_FAIL:
      return { ...state };
    case API_POSTPONE_VISIT:
      return { ...state,loaderresponce:true };
    case API_POSTPONE_VISIT_SUCCESS:
      return { ...state,getholdtripdata:action.payload.data ,loaderresponce:false };
    case API_POSTPONE_VISIT_FAIL:
      return { ...state,loaderresponce:false };
      case API_PICK_UP_VISIT:
        return { ...state,loaderresponce:true };
      case API_PICK_UP_VISIT_SUCCESS:
        return { ...state,getpickupdata:action.payload.data,loaderresponce:false  };
      case API_PICK_UP_VISIT_FAIL:
        return { ...state ,loaderresponce:false};
    case API_SEND_MESSAGE:
      return { ...state,loaderresponce:true };
    case API_SEND_MESSAGE_SUCCESS:
      return { ...state, sendResponce: action.payload.data,loaderresponce:false  };
    case API_SEND_MESSAGE_FAIL:
      return { ...state, sendResponce: action.error,loaderresponce:false };
    case API_UPDATE_END_DATE:
      return { ...state,loaderresponce:true };
    case API_UPDATE_END_DATE_SUCCESS:
      return { ...state, updateEndDateres: action.payload,loaderresponce:false };
    case API_UPDATE_END_DATE_FAIL:
      return { ...state, updateEndDateres: action.error,loaderresponce:false };
    case API_UPDATE_REACH_CLIENT:
      return { ...state };
    case API_UPDATE_REACH_CLIENT_SUCCESS:
      return { ...state, getreachclient: action.payload };
    case API_UPDATE_REACH_CLIENT_FAIL:
      return { ...state, getreachclient: action.error };
    case API_UPDATE_START_DATE:
      return { ...state,loaderresponce:true };
    case API_UPDATE_START_DATE_SUCCESS:
      return { ...state,updatestartdata: action.payload,loaderresponce:false };
    case API_UPDATE_START_DATE_FAIL:
      return { ...state,updatestartdata: action.error,loaderresponce:false };
    case API_GET_CANCEL_REASONS:
      return { ...state };
    case API_GET_CANCEL_REASONS_SUCCESS:
      return { ...state, getcancelreasons: action.payload };
    case API_GET_CANCEL_REASONS_FAIL:
      return { ...state, getcancelreasons: action.payload };
    case API_UPDATE_TRIP_START_DATE:
      return { ...state };
    case API_UPDATE_TRIP_START_DATE_SUCCESS:
      return { ...state, Getupdatetripstart: action.payload };
    case API_UPDATE_TRIP_START_DATE_FAIL:
      return { ...state, Getupdatetripstart: action.error };
    case API_UPDATE_TRIP_END_DATE:
      return { ...state };
    case API_UPDATE_TRIP_END_DATE_SUCCESS:
      return { ...state, getupdatetripend: action.payload };
    case API_UPDATE_TRIP_END_DATE_FAIL:
      return { ...state, getupdatetripend: action.error };
    case CARD_VIEW_TOGGLE:
      return { ...state, cardView: action.payload };
    case API_VISIT_ID_UPDATED:
      return { ...state, updatedvisit: action.payload.data };
    case API_UPDATE_DRIVES_STATUS:
      return { ...state, getdriverstatus: action.payload.data };
    case API_ALERT_UPDTED:
      return { ...state, alertmessagestatus: action.payload.data };
    case GET_API_ALERT_UPDTED:
      return { ...state, getVisitDetailData: action.payload.data };
    default:
      return state;
  }
};

// getting morning visit data
export function morningVisits(shift, pickup, driver,visitdates) {
  console.log("MOrning", shift, pickup, driver);
  return async (dispatch) => {
    await dispatch({
      type: API_MORNING_VISIT_OPTION,
      payload: {
        request: {
          method: "get",
          //  url: `${Constant.baseUrl}/api/Operation/GetDriverVisits?startDate=2022-01-05&driverId=${driver}&Shift=${shift}&DeliveryOrPickup=${pickup}`,
          // url: `${Constant.baseUrl}/api/Operation/GetDriverVisits?startDate=${moment(new Date()).format("YYYY-MM-DD")}&driverId=${driver}&Shift=${shift}&DeliveryOrPickup=${pickup}`,
          // url: `${Constant.baseUrl}/api/DriverVisit/GetSchdule?CarID=${driver}`,
          url: `${Constant.baseUrl}/api/DriverVisit/GetSchduleByDate?CarID=${driver}&VisitDate=${visitdates}`,
          data: {},
        },
      },
    });
  };
}

// get visit details
export const getVisitDetails = (visitId) => {
  return async (dispatch) => {
    console.log(visitId);
    await dispatch({
      type: API_GET_VISIT_DETAILS,
      payload: {
        request: {
          method: "post",
          url: `${Constant.baseUrl}/api/DriverVisit/GetVisitInfoByID?VisitID=${visitId}&Lang=1`,
          data: {},
        },
      },
    });
  };
};

// getting evening visit data
export function eveningVisits() {
  return async (dispatch) => {
    dispatch({
      type: API_EVENING_VISIT_OPTION,
      payload: {
        request: {
          method: "post",
          url: `${Constant.baseUrl}/api/Operation/GetDriverVisits?startDate=2023-01-10&driverId=63c7c728-a0b1-e711-80eb-0050568411f9&Shift=2&DeliveryOrPickup=1`,
          data: {},
        },
      },
    });
  };
}

// update start date
export function updateStartDate(id) {
  return async (dispatch) => {
   await dispatch({
      type: API_UPDATE_START_DATE,
      payload: {
        request: {
          method: "post",
          url: `${Constant.baseUrl}/api/DriverVisit/StartTrip`,
          data: id,
        },
      },
    });
  };
}

// update end date
export function updateEndDate(id) {
  return async (dispatch) => {
    await dispatch({
      type: API_UPDATE_END_DATE,
      payload: {
        request: {
          method: "post",
          url: `${Constant.baseUrl}/api/DriverVisit/FinishVisit`,
          data: id,
        },
      },
    });
  };
}

// evaluate event
export function UpdatedEditAddress(data) {
  return async (dispatch) => {
    await dispatch({
      type: API_EVALUATE_EVENT,
      payload: {
        request: {
          method: "post",
          url: `${Constant.baseUrl}/api/DriverVisit/UpdateLocaion`,
          data: data,
        },
      },
    });
  };
}

// send message
export function sendMessage(payload) {
  return async (dispatch) => {
    await dispatch({
      type: API_SEND_MESSAGE,
      payload: {
        request: {
          method: "post",
          url: `${Constant.baseUrl}/api/DriverVisit/StartVisit`,
          data: payload,
        },
      },
    });
  };
}

// postpone visit
export function updatedholdtrip(data) {
  return async (dispatch) => {
    await dispatch({
      type: API_POSTPONE_VISIT,
      payload: {
        request: {
          method: "post",
          url: `${Constant.baseUrl}/api/DriverVisit/HoldTrip`,
          data: data,
        },
      },
    });
  };
}
// postpone visit
export function updateStartPickup(data) {
  return async (dispatch) => {
    await dispatch({
      type: API_PICK_UP_VISIT,
      payload: {
        request: {
          method: "post",
          url: `${Constant.baseUrl}/api/DriverVisit/StartPickup`,
          data: data,
        },
      },
    });
  };
}

// update react client
export function updateReactClient(id) {
  return async (dispatch) => {
    await dispatch({
      type: API_UPDATE_REACH_CLIENT,
      payload: {
        request: {
          method: "post",
          url: `${Constant.baseUrl}/api/Operation/UpdateReachClient?id=${id.id}&supervisorId=${id.supervisorId}`,
          data: {},
        },
      },
    });
  };
}

// cancel visit
export function cancelVisit(data) {
  console.log(data);
  return async (dispatch) => {
    await dispatch({
      type: API_CANCEL_VISIT,
      payload: {
        request: {
          method: "post",
          url: `${Constant.baseUrl}/api/DriverVisit/CancelVisit`,
          data:data
        },
      },
    });
  };
}
// cancel visit
export function GetCancelReasons(id) {
  return async (dispatch) => {
    await dispatch({
      type: API_GET_CANCEL_REASONS,
      payload: {
        request: {
          method: "POST",
          url: `${Constant.baseUrl}/api/DriverGeneral/CancelReasons`,
        },
      },
    });
  };
}

// Start Trip
export function updateTripStart(payload) {
  console.log(payload);
  return async (dispatch) => {
    await dispatch({
      type: API_UPDATE_TRIP_START_DATE,
      payload: {
        request: {
          method: "post",
          url: `${Constant.baseUrl}/api/Driver/UpdateTripStartDate`,
          data: payload,
        },
      },
    });
  };
}

// End Trip
export function updateTripEnd(payload) {
  return async (dispatch) => {
    await dispatch({
      type: API_UPDATE_TRIP_END_DATE,
      payload: {
        request: {
          method: "post",
          url: `${Constant.baseUrl}/api/Driver/UpdateTripCompleteDate`,
          data: payload,
        },
      },
    });
  };
}

// toggle card view
export function toggleCardView(status) {
  return async (dispatch) => {
    await dispatch({
      type: CARD_VIEW_TOGGLE,
      payload: status,
    });
  };
}
export function visitIdupdate(data) {
  return async (dispatch) => {
    await dispatch({
      type: API_VISIT_ID_UPDATED,
      payload: {
        data,
      },
    });
  };
}
export function updatadrivestatus(data) {
  return async (dispatch) => {
    await dispatch({
      type: API_UPDATE_DRIVES_STATUS,
      payload: {
        data,
      },
    });
  };
}
export function GetDriverVisit(data) {
  return async (dispatch) => {
    await dispatch({
      type: GET_API_ALERT_UPDTED,
      payload: {
        data,
      },
    });
  };
}
export function AlertMessageshow(data) {
  console.log("alertupdated", data);
  return async (dispatch) => {
    await dispatch({
      type: API_ALERT_UPDTED,
      payload: {
        data,
      },
    });
  };
}
