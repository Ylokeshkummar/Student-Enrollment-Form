
<!DOCTYPE html>
<!--
Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/html.html to edit this template
-->
<html>
    <head>
        <title>Student Enrollment Form</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet"href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    </head>
    <body>
        <div class="container">
            <div class="page-header text-center">
                <h2>STUDENT ENROLLMENT FORM</h2>
            </div>
            <form id="empform" method="get">
                <div class="form-group">
                    <label>Roll No</label>
                    <input type="text" class="form-control" id="rollno" onchange="getEmp()">
                </div>
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" class="form-control" id="fname">
                </div>
                <div class="form-group">
                    <label>Class</label>
                    <input type="text" class="form-control" id="sclass">
                </div>
                <div class="form-group">
                    <label>Birth Date</label>
                    <input type="text" class="form-control" id="bdate">
                </div>
                <div class="form-group">
                    <label>Adress</label>
                    <input type="text" class="form-control" id="adress">
                </div>
                <div class="form-group">
                    <label>Enrollment date</label>
                    <input type="text" class="form-control" id="edate">
                </div>
                <div class="form-group text-center">
                    <input type="button" class="btn btn-primary" id="save" value="save" onclick="saveData();"disable>
                    <input type="button" class="btn btn-primary" id="Change" value="update" onclick=" changeData();"disable>
                    <input type="button" class="btn btn-primary" id="Reset" value="reset" onclick="resetForm();"disable>
                </div>
            </form>
        </div>
        <script type="text/javascript" src="https://login2explore.com/jpdb/resources/js/0.0.3/jpdb-commons.js"></script>
        <script type="text/javascript" src="js/js.js"></script>

    </body>
</html>
