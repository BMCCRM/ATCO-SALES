<%@ Page Title="Doctor Profile" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="DoctorProfile.aspx.cs" Inherits="PocketDCR2.Form.DoctorProfile" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <link rel="icon" href="../assets/img/ici_favicon.png" type="image/gif" sizes="16x16" />
    <link rel="stylesheet" href="assets_new/bootstrap.min.css" />
    <%--<link rel="stylesheet" href="assets_new/font-awesome.min.css" />--%>


    <link href="assets_new/bootstrap.min.css" rel="stylesheet" />
    <link href="assets_new/dataTables.bootstrap.min.css" rel="stylesheet" />
    <link href="assets_new/dataTables.fontAwesome.css" rel="stylesheet" />

    <%--<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" />--%>
    <link href="assets_new/font-awesome/css/fontawesome-all.min.css" rel="stylesheet" />

    <link rel="stylesheet" href="assets_new/jquery-ui.css" />

    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />

    <style type="text/css">

        @media (min-width: 1200px) {
            .container {
                width: 1500px;
            }
        }

        .form-inline .form-group {
            margin-right: 10px;
        }

        .well-primary {
            color: rgb(255, 255, 255);
            background-color: rgb(66, 139, 202);
            border-color: rgb(53, 126, 189);
        }

        .fa {
            margin-right: 5px;
        }

        .panel-heading {
            padding: 15px 15px;
        }

        .panel-title {
            font-size: 18px;
        }

        th {
            background: #7f7f7f;
            color: #fff;
        }

        td {
            background: #e0e0e0;
            color: #000;
        }

        .table-bordered.table tbody tr {
            border: 5px solid #fff !important;
        }

        table tr {
            padding: 0px !important;
            margin: 0px !important;
        }

            table tr th {
                padding: 2px !important;
                margin: 0px !important;
            }

            table tr td {
                padding: 2px !important;
                margin: 0px !important;
            }

            .ui-menu ui-widget ui-widget-content ui-autocomplete ui-front {
            height: 350px;
            overflow-y: auto;
            overflow-x: hidden;
        }

        .btn-search {
            background: #424242;
            border-radius: 0;
            color: #fff;
            border-width: 1px;
            border-style: solid;
            border-color: #1c1c1c;
        }

            .btn-search:link, .btn-search:visited {
                color: #fff;
            }

            .btn-search:active, .btn-search:hover {
                background: #1c1c1c;
                color: #fff;
            }

    </style>

</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div id="Divmessage" class="jqmConfirmation">
        <div class="jqmTitle">
            Message
        </div>
        <div class="divEdit">
            <div class="divTable">
                <div class="jqmmsg">
                    <label id="hlabmsg" name="hlabmsg">
                    </label>
                    <br />
                    <br />
                    <input id="btnOk" name="btnOk" type="button" value="OK" />
                </div>
            </div>
        </div>
    </div>

    <br />
    <br />

    <div class="container">
        <div class="row">
            <div class="col-md-5">
                <h2 class="text-left">Customer Profile Card</h2>
            </div>
            <div class="col-md-2" style="margin-top: 20px;">
                <select id="ddlDocCities" class="form-control" onchange="OnChangeddlCity();">
                    <option>Select</option>
                </select>
            </div>
            <div class="col-md-5 pull-right" style="margin-top: 20px;">
                <div class="input-group">
                    <input type="text" id="txtCustomerCode" name="txtCustomerCode" class="form-control" disabled="disabled" placeholder="Search Customer by Code.." />
                    <span class="input-group-btn">
                        <button class="btn btn-search" id="btnGetCustomerProfile" type="button" onclick="GetCustomerProfileDetails()"><i class="fa fa-search fa-fw"></i>Search</button>
                    </span>
                </div>
            </div>
            <br />
            <br />
        </div>
        <br />
        <div class="row">
            <div class="col-md-12">
                <div class="table-responsive" style="overflow-x: hidden;">
                    <table class="table table-bordered">
                        <tr>
                            <th>Doctor's Name</th>
                            <td class="doc_name_val">-</td>
                            <th>PMDC#</th>
                            <td class="doc_pmdc_val">-</td>
                            <th>System Code</th>
                            <td class="doc_systemcode_val">-</td>
                            <th>City</th>
                            <td class="doc_city_val">-</td>
                        </tr>
                        <tr>
                            <th>S/O,D/O,W/O</th>
                            <td class="doc_guardian_val">-</td>
                            <th>Gender</th>
                            <td class="doc_gender_val">-</td>
                            <th>Religion</th>
                            <td class="doc_religion_val">-</td>
                            <th>Sect.</th>
                            <td class="doc_sector_val">-</td>
                        </tr>
                        <tr>
                            <th>Qualification</th>
                            <td class="doc_qualification_val">-</td>
                            <th>Specialty-1</th>
                            <td class="doc_speciality1_val">-</td>
                            <th>Specialty-2</th>
                            <td class="doc_speciality2_val">-</td>
                            <th>Specialty-3</th>
                            <td class="doc_speciality3_val">-</td>
                        </tr>
                        <tr>
                            <th>Clinic Address</th>
                            <td class="doc_clinicaddress_val">-</td>
                            <th>Cell #</th>
                            <td class="doc_Cellphone_val">-</td>
                            <th>Clinic Phone #</th>
                            <td class="doc_clinicphone_val">-</td>
                            <th>Practice Type</th>
                            <td class="doc_practicetype_val">-</td>
                        </tr>
                        <tr>
                            <th>Home Address</th>
                            <td class="doc_address_val">-</td>
                            <th>Home Phone #</th>
                            <td class="doc_homephone_val">-</td>
                            <th>Email Address</th>
                            <td colspan="4" class="doc_email_val">-</td>
                        </tr>
                        <tr>
                            <th>Hospital</th>
                            <td class="doc_hospital_val">-</td>
                            <th>Ward</th>
                            <td class="do_ward_val">-</td>
                            <th>Designation</th>
                            <td class="doc_designation_val">-</td>
                            <th>Responsibility</th>
                            <td class="doc_responsibility_val">-</td>
                        </tr>
                        <tr>
                            <th>Call Day</th>
                            <td class="doc_callday_val">-</td>
                            <th>Preferred Call Time</th>
                            <td class="doc_calltime_val">-</td>
                            <th>Call Frequency</th>
                            <td class="doc_callfrequency_val">-</td>
                            <th>Practice Size</th>
                            <td class="doc_practicesize_val">-</td>
                        </tr>
                        <tr>
                            <th>Hobby</th>
                            <td class="doc_hobby_val">-</td>
                            <th>Style</th>
                            <td class="doc_style_val">-</td>
                            <th>No. Of Family Members</th>
                            <td class="doc_family_val">-</td>
                            <th>No. Of Wives</th>
                            <td class="doc_wives_val">-</td>
                        </tr>
                        <tr>
                            <th>No. Of Sons</th>
                            <td class="doc_sons_val">-</td>
                            <th>No. Of Daughters</th>
                            <td class="doc_daugthers_val">-</td>
                            <th>D.O.B</th>
                            <td class="doc_dobmonth_val">-</td>
                            <td class="doc_dobday_val">-</td>
                            <td class="doc_dobyear_val">-</td>
                        </tr>
                        <tr>
                            <th>Rx Preference I</th>
                            <td class="doc_rxpreference1_val">-</td>
                            <th>Rx Preference II</th>
                            <td class="doc_rxpreference2_val">-</td>
                            <th>D.O.M</th>
                            <td class="doc_dommonth_val">-</td>
                            <td class="doc_domday_val">-</td>
                            <td class="doc_domyear_val">-</td>
                        </tr>
                        <tr>
                            <th>CCL Relationship Status</th>
                            <td class="doc_companyrelationstatus_val">-</td>
                            <th>SPO/DSM/SM/HO Relationship</th>
                            <td class="doc_sporelation_val">-</td>
                            <th>Engagement Status</th>
                            <td class="doc_engagementstatus_val">-</td>
                            <th>Buying Motive-1</th>
                            <td class="doc_buyingmotive1_val">-</td>
                        </tr>
                        <tr>
                            <th>Distributor</th>
                            <td class="doc_distributor_val">-</td>
                            <th>Distributor City</th>
                            <td class="docdistributorcity_val">-</td>
                            <th>Brick ID</th>
                            <td class="doc_brickid_val">-</td>
                            <th>Buying Motive-2</th>
                            <td class="doc_buyingmotive2_val">-</td>
                        </tr>
                        <tr>
                            <th>SPO</th>
                            <td class="doc_spo_val">-</td>
                            <th>Team</th>
                            <td class="doc_team_val">-</td>
                            <th>Base Town</th>
                            <td class="doc_basetown_val">-</td>
                            <th>Buying Motive-3</th>
                            <td class="doc_buyingmotive3_val">-</td>
                        </tr>
                        <tr>
                            <th>Engaging Team-1</th>
                            <td class="doc_engagingteam1_val">-</td>
                            <th>Engaging Team-2</th>
                            <td class="doc_engagingteam2_val">-</td>
                            <th>Engaging Team-3</th>
                            <td class="doc_engagingteam3_val">-</td>
                            <th>Engaging Team-4</th>
                            <td class="doc_engagingteam4_val">-</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>


    <%--<div class="container">
        <div class="row">
            <div class="col-md-12">
                <h1>
                    <i class="fa fa-user-md"></i>&nbsp;&nbsp;Doctor Profile Card
                </h1>
                <br />
                <div class="panel-group" id="accordion">

                    <div class="panel panel-default">
                        <div class="panel-heading" style="cursor:pointer;" data-toggle="collapse" data-parent="#accordion" href="#doc_personal">
                            <h4 class="panel-title">
                                <span class="right-arrow pull-right" style="font-size: 13px; margin-top: 5px;"><i class="fa fa-pencil-alt"></i></span>
                                <a><span class="fa fa-user-md"></span>Personal Details</a>
                            </h4>
                        </div>
                        <div id="doc_personal" class="panel-collapse collapse in">
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-md-4 form-group">
                                        <label for="grant1">PMDC #</label>
                                        <input type="text" class="form-control" id='grant1' placeholder="PMDC #" required />
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label for="grant2">S/O, D/O, W/O</label>
                                        <input type="text" class="form-control" id'grant2' placeholder="S/O, D/O, W/O" required />
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label for="grant2">Email</label>
                                        <input type="email" class="form-control" id'grant2' placeholder="Email" required />
                                    </div>

                                    <div class="col-md-6 form-group">
                                        <label for="Religion">Religion</label>
                                        <select class="form-control" id="Religion">
                                            <option value="">Select</option>
                                            <option>Islam</option>
                                            <option>Hinduism</option>
                                            <option>Sikh</option>
                                            <option>Christianity</option>
                                            <option>Other</option>
                                        </select>
                                    </div><div class="col-md-6 form-group">
                                        <label for="Sect">Sect.</label>
                                        <select class="form-control" id="Sect">
                                            <option value="">Select</option>
                                            <option>Sunni Brailvi</option>
                                            <option>Sunni Deobandi</option>
                                            <option>Shia</option>
                                            <option>Ahl-e-Hadith</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    
                                    <div class="col-md-6 form-group">
                                        <label for="Hobby">Hobby</label>
                                        <select class="form-control" id="Hobby">
                                            <option value="">Select</option>
                                            <option>Sports</option>
                                            <option>Books</option>
                                            <option>Traveling</option>
                                            <option>TV / Movies</option>
                                            <option>Socializing</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6 form-group">
                                        <label for="Style">Style</label>
                                        <select class="form-control" id="Style">
                                            <option value="">Select</option>
                                            <option>Friendly</option>
                                            <option>Sociable</option>
                                            <option>Unsociable</option>
                                            <option>Cooperative</option>
                                            <option>Noncooperative</option>
                                            <option>Listener</option>
                                            <option>Nonlistener</option>
                                            <option>Stubborn</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    
                                    <div class="col-md-4 form-group">
                                        <label for="grant1">No. of Family Members</label>
                                        <input type="text" class="form-control" id='grant1' placeholder="No. of Family Members" required />
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label for="grant2">No. of Wives</label>
                                        <input type="text" class="form-control" id'grant2' placeholder="No. of Wives" required />
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label for="grant2">D.O.M</label>
                                        <input type="text" class="form-control" id'grant2' placeholder="D.O.M" required />
                                    </div>

                                    <div class="col-md-4 form-group">
                                        <label for="grant1">No. of Sons</label>
                                        <input type="text" class="form-control" id='grant1' placeholder="No. of Sons" required />
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label for="grant2">No. of Daughters</label>
                                        <input type="text" class="form-control" id'grant2' placeholder="No. of Daughters" required />
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label for="grant2">D.O.B</label>
                                        <input type="text" class="form-control" id'grant2' placeholder="D.O.B" required />
                                    </div>
                                </div>
                                <br />
                                <div class="row pull-right">
                                    <div class="col-md-12">
                                        <button type="button" class="btn btn-success">Save</button>
                                        <button type="button" class="btn btn-primary">Save & Next</button>
                                        <button type="button" class="btn btn-danger">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-heading" style="cursor:pointer;" data-toggle="collapse" data-parent="#accordion" href="#doc_clinic">
                            <h4 class="panel-title">
                                <span class="right-arrow pull-right" style="font-size: 13px; margin-top: 5px;"><i class="fa fa-pencil-alt"></i></span>
                                <a><span class="fa fa-briefcase-medical"></span>Clinic Details</a>
                            </h4>
                        </div>
                        <div id="doc_clinic" class="panel-collapse collapse">
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-md-12 text-right">
                                        <button class="btn btn-sm btn-primary" style="margin-top: 5px;"><i class="fa fa-plus" style="margin-left: 5px;"></i></button>
                                        <button class="btn btn-sm btn-danger" style="margin-top: 5px;"><i class="fa fa-minus" style="margin-left: 5px;"></i></button>
                                    </div>
                                </div>
                                <div class="doctor_clinic_div_1" style="border-bottom: 1px solid #e4e4e4;">
                                    <div class="row">
                                        <div class="col-md-4 form-group">
                                            <label for="grant1">Address</label>
                                            <input type="text" class="form-control" id='grant1' placeholder="Address" required />
                                        </div>
                                        <div class="col-md-3 form-group">
                                            <label for="grant2">Cell #</label>
                                            <input type="text" class="form-control" id'grant2' placeholder="Cell #" required />
                                        </div>
                                        <div class="col-md-3 form-group">
                                            <label for="grant2">Phone</label>
                                            <input type="text" class="form-control" id'grant2' placeholder="Phone" required />
                                        </div>
                                        <div class="col-md-2 form-group">
                                            <label for="PracticeType">Practice Type</label>
                                            <select class="form-control" id="PracticeType">
                                                <option value="">Select</option>
                                                <option>RX</option>
                                                <option>Dispensing</option>
                                                <option>Both</option>
                                            </select>
                                        </div>
                                    </div> 
                                </div>
                                    <br />                                   
                                    <div class="row pull-right">
                                        <div class="col-md-12">
                                            <button type="button" class="btn btn-success">Save</button>
                                            <button type="button" class="btn btn-primary">Save & Next</button>
                                            <button type="button" class="btn btn-danger">Cancel</button>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-heading" style="cursor:pointer;" data-toggle="collapse" data-parent="#accordion" href="#doc_hosp">
                            <h4 class="panel-title">
                                <span class="right-arrow pull-right" style="font-size: 13px; margin-top: 5px;"><i class="fa fa-pencil-alt"></i></span>
                                <a><span class="fa fa-hospital"></span>Hospital Details</a>
                            </h4>
                        </div>
                        <div id="doc_hosp" class="panel-collapse collapse">
                            <div class="panel-body">
                                <div class="doctor_hosp_div_1" style="border-bottom: 1px solid #e4e4e4;">                                    
                                <div class="row">
                                    <div class="col-md-12 text-right">
                                        <button class="btn btn-sm btn-primary" style="margin-top: 5px;"><i class="fa fa-plus" style="margin-left: 5px;"></i></button>
                                        <button class="btn btn-sm btn-danger" style="margin-top: 5px;"><i class="fa fa-minus" style="margin-left: 5px;"></i></button>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3 form-group">
                                        <label for="grant1">Hospital</label>
                                        <input type="text" class="form-control" id='Hospital' placeholder="Hospital" required />
                                    </div>
                                    <div class="col-md-3 form-group">
                                        <label for="grant2">Ward</label>
                                        <input type="text" class="form-control" id'Ward' placeholder="Ward" required />
                                    </div>
                                    <div class="col-md-3 form-group">
                                        <label for="grant2">Designation</label>
                                        <select class="form-control" id="Designation">
                                            <option value="">Select</option>
                                            <option>Professor</option>
                                            <option>Associate Professor</option>
                                            <option>Assistant Professor</option>
                                            <option>Senior Registrar</option>
                                            <option>Registrar</option>
                                            <option>R.M.O</option>
                                            <option>S.M.O</option>
                                            <option>M.O</option>
                                            <option>H.O</option>
                                            <option>Demonstrator</option>
                                            <option>LHV</option>
                                            <option>GP</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3 form-group">
                                        <label for="Responsibility">Responsibility</label>
                                        <select class="form-control" id="Responsibility">
                                            <option value="">Select</option>
                                            <option>E.D.O</option>
                                            <option>Admin. R.M.O</option>
                                            <option>M.S</option>
                                            <option>D.M.S</option>
                                            <option>C.O</option>
                                            <option>Head of the Dept.</option>	
                                            <option>Incharge Registrar</option>	
                                            <option>Pharmacy Incharge</option>	
                                            <option>R.M.O General</option>
                                            <option>Ward Incharge</option>
                                            <option>Owner of Hospital</option>	
                                            <option>Store Incharge</option>
                                            <option>Formulary Incharge</option>	
                                            <option>Formulary Member</option>
                                            <option>Other</option>
                                        </select>
                                    </div>

                                    <div class="col-md-3 form-group">
                                        <label for="grant1">Call Day</label>
                                        <select class="form-control" id="CallDay">
                                            <option value="">Select</option>
                                            <option>Monday</option>
                                            <option>Tuesday</option>
                                            <option>Wednesday</option>
                                            <option>Thursday</option>
                                            <option>Friday</option>
                                            <option>Saturday</option>
                                            <option>Sunday</option>

                                        </select>
                                    </div>
                                    <div class="col-md-3 form-group">
                                        <label for="grant2">Preferred Call Time</label>                                        
                                        <select class="form-control" id="PreferredCallTime">
                                            <option>0800HRS PST</option>
                                            <option>0830HRS PST</option>
                                            <option>0900HRS PST</option>
                                            <option>1000HRS PST</option>
                                            <option>1030HRS PST</option>
                                            <option>1100HRS PST</option>
                                            <option>1130HRS PST</option>
                                            <option>1200HRS PST</option>
                                            <option>1230HRS PST</option>
                                            <option>1300HRS PST</option>
                                            <option>1330HRS PST</option>
                                            <option>1400HRS PST</option>
                                            <option>1430HRS PST</option>
                                            <option>1500HRS PST</option>
                                            <option>1530HRS PST</option>
                                            <option>1600HRS PST</option>
                                            <option>1630HRS PST</option>
                                            <option>1700HRS PST</option>
                                            <option>1730HRS PST</option>
                                            <option>1800HRS PST</option>
                                            <option>1830HRS PST</option>
                                            <option>1900HRS PST</option>
                                            <option>1930HRS PST</option>
                                            <option>2000HRS PST</option>
                                            <option>2030HRS PST</option>
                                            <option>2100HRS PST</option>
                                            <option>2130HRS PST</option>
                                            <option>2200HRS PST</option>
                                            <option>2230HRS PST</option>
                                            <option>2300HRS PST</option>
                                            <option>2330HRS PST</option>
                                            <option>2400HRS PST</option>
                                            <option>0100HRS PST</option>
                                            <option>0130HRS PST</option>
                                            <option>0200HRS PST</option>
                                            <option>0230HRS PST</option>
                                            <option>0300HRS PST</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3 form-group">
                                        <label for="grant2">Call Frequency</label>
                                        <input type="text" class="form-control" id'Ward' placeholder="Call Frequency" required />
                                    </div>
                                    <div class="col-md-3 form-group">
                                        <label for="Responsibility">Practice Size</label>
                                        <input type="text" class="form-control" id'Ward' placeholder="Practice Size" required />
                                    </div>

                                </div>
                                    </div>
                                <br />
                                <div class="row pull-right">
                                    <div class="col-md-12">
                                        <button type="button" class="btn btn-success">Save</button>
                                        <button type="button" class="btn btn-primary">Save & Next</button>
                                        <button type="button" class="btn btn-danger">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-heading" style="cursor:pointer;" data-toggle="collapse" data-parent="#accordion" href="#doc_ccl_status">
                            <h4 class="panel-title">
                                <span class="right-arrow pull-right" style="font-size: 13px; margin-top: 5px;"><i class="fa fa-pencil-alt"></i></span>
                                <a><span class="fa fa-building"></span>Company Status</a>
                            </h4>
                        </div>
                        <div id="doc_ccl_status" class="panel-collapse collapse">
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-md-12 text-right">
                                        <button class="btn btn-sm btn-primary" style="margin-top: 5px;"><i class="fa fa-plus" style="margin-left: 5px;"></i></button>
                                        <button class="btn btn-sm btn-danger" style="margin-top: 5px;"><i class="fa fa-minus" style="margin-left: 5px;"></i></button>
                                    </div>
                                </div>
                                <div class="doctor_company_status_div_1" style="border-bottom: 1px solid #e4e4e4;">
                                <div class="row">
                                    <div class="col-md-4 form-group">
                                        <label for="grant1">CCL Relationship Status</label>
                                        <select class="form-control" id="PracticeType">
                                            <option value="">Select</option>
                                            <option>Rxer</option>
                                            <option>Non Rxer</option>
                                            <option>Occasional</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label for="grant2">SPO/DSM/SM/HO Relationship</label>
                                        <select class="form-control" id="PracticeType">
                                            <option value="">Select</option>
                                            <option>SPO-Strong</option>
                                            <option>SPO-Weak</option>
                                            <option>DSM-Strong</option>
                                            <option>DSM-Weak</option>
                                            <option>SM-Strong</option>
                                            <option>SM-Weak</option>
                                            <option>HO-Strong</option>
                                            <option>HO-Weak</option>
                                            <option>No Relationship</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4 form-group">
                                        <label for="grant2">Engagement Status</label>
                                        <select class="form-control" id="PracticeType">
                                            <option value="">Select</option>
                                            <option>CME</option>
                                            <option>Conference</option>
                                            <option>Personal Obligation</option>
                                            <option>Academics</option>
                                            <option>Gifting</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>
                                    </div>
                                <br />
                                <div class="row pull-right">
                                    <div class="col-md-12">
                                        <button type="button" class="btn btn-success">Save</button>
                                        <button type="button" class="btn btn-primary">Save & Next</button>
                                        <button type="button" class="btn btn-danger">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-heading" style="cursor:pointer;" data-toggle="collapse" data-parent="#accordion" href="#doc_team">
                            <h4 class="panel-title">
                                <span class="right-arrow pull-right" style="font-size: 13px; margin-top: 5px;"><i class="fa fa-pencil-alt"></i></span>
                                <a><span class="fa fa-users"></span>Engaging Teams</a>
                            </h4>
                        </div>
                        <div id="doc_team" class="panel-collapse collapse">
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-md-12 text-right">
                                        <button class="btn btn-sm btn-primary" style="margin-top: 5px;"><i class="fa fa-plus" style="margin-left: 5px;"></i></button>
                                        <button class="btn btn-sm btn-danger" style="margin-top: 5px;"><i class="fa fa-minus" style="margin-left: 5px;"></i></button>
                                    </div>
                                </div>
                                <div class="doctor_team_div_1" style="border-bottom: 1px solid #e4e4e4;">
                                <div class="row">
                                    <div class="col-md-4 form-group">
                                        <label for="grant1">Engaging Team</label>
                                        <select class="form-control" id="PracticeType">
                                            <option value="">Select</option>
                                            <option>Max</option>
                                            <option>Matrix</option>
                                            <option>Excel</option>
                                            <option>Advance</option>
                                            <option>Urology</option>
                                            <option>Exemplar</option>
                                            <option>Star</option>
                                            <option>Galaxy</option>
                                            <option>Acer</option>
                                            <option>Mass</option>
                                            <option>Specialty</option>
                                        </select>
                                    </div>
                                </div>
                                    </div>
                                <br />
                                <div class="row pull-right">
                                    <div class="col-md-12">
                                        <button type="button" class="btn btn-success">Save</button>
                                        <button type="button" class="btn btn-danger">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    

                </div>
            </div>
        </div>
    </div>--%>




    <script type="text/javascript" src="assets_new/jquery-1.12.4.js"></script>
    <script type="text/javascript" src="../Scripts/json-minified.js"></script>
    <script type="text/javascript" src="assets_new/bootstrap.min.js"></script>
    <script type="text/javascript" src="assets_new/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="assets_new/dataTables.bootstrap.min.js"></script>
    <script type="text/javascript" src="assets_new/dataTables.responsive.min.js"></script>
    <script type="text/javascript" src="assets_new/responsive.bootstrap.min.js"></script>
    <script type="text/javascript" src="assets_new/jquery.validate.min.js"></script>
    <script type="text/javascript" src="assets_new/additional-methods.min.js"></script>
    <script type="text/javascript" src="assets_new/jquery.cookie.min.js"></script>
    <script type="text/javascript" src="assets_new/jquery-ui.js"></script>

    
    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>

    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>

    <script type="text/javascript">
        var $2 = jQuery.noConflict();
    </script>

    <script type="text/javascript" src="DoctorProfile.js"></script>

</asp:Content>
