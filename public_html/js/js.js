





var jpdpBaseURL="http://api.login2explore.com:5577";
var jpdbIRL="/api/irl";
var jpdbIML="/api/iml";
var empDBName="SCHOOL-DB";
var empRelationName="STUDENT-TABLE";
var connToken="90932603|-31949278079260401|90949053";

$("#rollno").focus();

function saveRecNo2LS(jsonObj){
        var lvdata=JSON.parse(jsonObj.data);
        localStorage.setItem("recno",lvdata.rec_no);
}

function getEmpIdAsJsonObj(){
    var empid=$("#rollno").val();
    var jsonStr={
    id:empid
    };
    return JSON.stringify(jsonStr);
}
       
function fillData(jsonObj){
            saveRecNo2LS(jsonObj);
            var record=JSON.parse(jsonObj.data).record;
            $("#fname").val(record.name);
            $("#sclass").val(record.class);
            $("#bdate").val(record.bdate);
            $("#adress").val(record.adress);
            $("#edate").val(record.edate);            
        }
function resetForm() {
        $("#rollno").val("");
        $("#fname").val("");
        $("#sclass").val("");
        $("#bdate").val("");
        $("#adress").val("");
        $("#edate").val("");
        $("#rollno").prop("disabled", false);
        $("#save").prop("disabled", true);
        $("#change").prop("disabled", true);
        $("#reset").prop("disabled", true);
        $("#rollno").focus();
        }
       
       
        function validateData() {
        var rollno,fname,sclass,bdate,adress,edate ;
        rollno=$("#rollno").val();
        fname=$("#fname").val();
        sclass=$("#sclass").val();
        bdate=$("#bdate").val();
        adress=$("#adress").val();
        edate=$("#edate").val();
        
        if(rollno===""){
            alert("Roll No Misiing");
            $("#rollno").focus();
            return "";
        }
         if(fname===""){
            alert("Name misiing");
            $("#fname").focus();
            return "";
        }
         if(sclass===""){
            alert("Student CLass misiing");
            $("#sclass").focus();
            return "";
        }
         if(bdate===""){
            alert("Birth Date misiing");
            $("#bdate").focus();
            return "";
        }
         if(adress===""){
            alert("Adress  misiing");
            $("#adress").focus();
            return "";
        }
         if(edate===""){
            alert("Enrollment Date misiing");
            $("#edate").focus();
            return "";
        }
        
        var jsonStrObj = {
        Rollno:rollno,
        name:fname,
        class:sclass,
        BirthDate:bdate,
        Adress:adress,
        EnrollmentDate:edate
        };
        return JSON.stringify(jsonStrObj);
        }
        
        function getEmp(){
            var empIdJsonObj=getEmpIdAsJsonObj();
            alert(empIdJsonObj);
            var getRequest=createGET_BY_KEYRequest(connToken,empDBName,empRelationName,empIdJsonObj);
            alert(getRequest);
            jQuery.ajaxSetup({async:false});
        var resJsonObj=executeCommandAtGivenBaseUrl(getRequest,jpdpBaseURL,jpdbIRL);
        alert(resJsonObj);
        jQuery.ajaxsetup({async:true});
        var out=resJsonObj.status;
        alert(out);
        if(resJsonObj.status===400){
            $("#save").prop("disabed",false);
            $("#reset").prop("disabled",false);
            $("#fname").focus();
        }
        else if(resJsonObj.status===200){
            $("#rollno").prop("disabled",true);
            fillData(resJsonObj);
            $("#change").prop("disabled",false);
            $("#reset").prop("disabled",false);
            $("#fname").focus();
    
        }
    }
    
    
    
    function  saveData(){
        var jsonStrObj=validateData();
        alert(jsonStrObj);
        if(jsonStrObj===""){
            return "";
        }
        var putRequest = createPUTRequest(connToken,jsonStrObj,empDBName,empRelationName);
        alert(putRequest);
        jQuery.ajax({async:false});
        var resJsonObj=executeCommandAtGivenBaseUrl(putRequest,jpdpBaseURL,jpdbIML);
        jQuery.ajax({async:true});
        alert(JSON.stringify(resJsonObj));
        resetForm();
        $("#rollno").focus();
        }
        
        function changeData(){
            $("#change").prop("disabled",true);
            jsonChg=validateData();
            alert(jsonChg);
            var updateRequest=createUPDATERecordRequest(connToken,jsonChg,empDBName,empRelationName,localStorage.getItem("recno"));
            alert(updateRequest);
            jQuery.ajaxSetup({async:false});
        var resJsonObj=executeCommandAtGivenBaseUrl(updateRequest,jpdpBaseURL,jpdbIML);
        jQuery.ajaxSetup({async:true});
        console.log(resJsonObj);
        resetForm();
        $("#rollno").focus();
        }
    function getEmpIdAsJsonObj(){
            var rollno=$("#rollno").val();
            alert(rollno);
            var jsonStr={
                id:rollno
            };
            alert(jsonStr);
            return JSON.stringify(jsonStr);
        }
            
            
            
        function createPUTRequest(connToken, jsonObj, dbName, relName) {
    var putRequest = "{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"dbName\": \""
            + dbName
            + "\",\n" + "\"cmd\" : \"PUT\",\n"
            + "\"rel\" : \""
            + relName + "\","
            + "\"jsonStr\": \n"
            + jsonObj
            + "\n"
            + "}";
    return putRequest;
}
            
           function executeCommandAtGivenBaseUrl(reqString, dbBaseUrl, apiEndPointUrl) {
    var url = dbBaseUrl + apiEndPointUrl;
    var jsonObj;
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
}
function createUPDATERecordRequest(token, jsonObj, dbName, relName, reqId) {
    var req = "{\n"
            + "\"token\" : \""
            + token
            + "\","
            + "\"dbName\": \""
            + dbName
            + "\",\n" + "\"cmd\" : \"UPDATE\",\n"
            + "\"rel\" : \""
            + relName
            + "\",\n"
            + "\"jsonStr\":{ \""
            + reqId
            + "\":\n"
            + jsonObj
            + "\n"
            + "}}";
    return req;
}
function createGET_BY_KEYRequest(token, dbname, relationName, jsonObjStr, createTime, updateTime) {
    if (createTime !== undefined) {
        if (createTime !== true) {
            createTime = false;
        }
    } else {
        createTime = false;
    }
    if (updateTime !== undefined) {
        if (updateTime !== true) {
            updateTime = false;
        }
    } else {
        updateTime = false;
    }
    var value1 = "{\n"
            + "\"token\" : \""
            + token
            + "\",\n" + "\"cmd\" : \"GET_BY_KEY\",\n"
            + "\"dbName\": \""
            + dbname
            + "\",\n"
            + "\"rel\" : \""
            + relationName
           
            + "\,"
            + "\"createTime\":"
            + createTime
            + "\,"
            + "\"updateTime\":"
            + updateTime
             + "\",\n"
            + "\"jsonStr\":\n"
            + jsonObjStr
            + "}";
    return value1;
}
            
            
              /* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


