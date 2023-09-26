<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="IncentiveSetup.aspx.cs" Inherits="PocketDCR2.Form.IncentiveSetup" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%@ Register Assembly="obout_Grid_NET" Namespace="Obout.Grid" TagPrefix="obout" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">




    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous" />
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>


    <script src="../Scripts/jquery-1.4.4.js" type="text/javascript"></script>
    <script src="../Scripts/jQueryMsg/jquery.msg.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQueryMsg/msg.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jqModal/jqModal.js" type="text/javascript"></script>
    <link href="../Scripts/jqModal/jqModal.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/json-minified.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/Validation/CustomValidation.js" type="text/javascript"></script>
    <script src="IncentiveSetup.js"></script>
    <style type="text/css">
        .divgrid {
            width: 800px;
            overflow: scroll;
        }
    </style>



   


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <style>
        body {
	font-family: 'Varela Round', sans-serif;
}
.modal-confirm {		
	color: #434e65;
	width: 525px;
}
.modal-confirm .modal-content {
	padding: 20px;
	font-size: 16px;
	border-radius: 5px;
	border: none;
}
.modal-confirm .modal-header {
	background: #e85e6c;
	border-bottom: none;   
	position: relative;
	text-align: center;
	margin: -20px -20px 0;
	border-radius: 5px 5px 0 0;
	padding: 35px;
}
.modal-confirm h4 {
	text-align: center;
	font-size: 36px;
	margin: 10px 0;
}
.modal-confirm .form-control, .modal-confirm .btn {
	min-height: 40px;
	border-radius: 3px; 
}
.modal-confirm .close {
	position: absolute;
	top: 15px;
	right: 15px;
	color: #fff;
	text-shadow: none;
	opacity: 0.5;
}
.modal-confirm .close:hover {
	opacity: 0.8;
}
.modal-confirm .icon-box {
	color: #fff;		
	width: 95px;
	height: 95px;
	display: inline-block;
	border-radius: 50%;
	z-index: 9;
	border: 5px solid #fff;
	padding: 15px;
	text-align: center;
}
.modal-confirm .icon-box i {
	font-size: 58px;
	margin: -2px 0 0 -2px;
}
.modal-confirm.modal-dialog {
	margin-top: 80px;
}
.modal-confirm .btn, .modal-confirm .btn:active {
	color: #fff;
	border-radius: 4px;
	background: #eeb711 !important;
	text-decoration: none;
	transition: all 0.4s;
	line-height: normal;
	border-radius: 30px;
	margin-top: 10px;
	padding: 6px 20px;
	min-width: 150px;
	border: none;
}
.modal-confirm .btn:hover, .modal-confirm .btn:focus {
	background: #eda645 !important;
	outline: none;
}
.trigger-btn {
	display: inline-block;
	margin: 100px auto;
}

    </style>
   



    <style>

        body{
  background-color: #e6e6e6;
  width: 100%;
  height: 100%;
}
 #success_tic .page-body{
  max-width:300px;
  background-color:#FFFFFF;
  margin:10% auto;
}
 #success_tic .page-body .head{
  text-align:center;
}
/* #success_tic .tic{
  font-size:186px;
} */
#success_tic .close{
      opacity: 1;
    position: absolute;
    right: 0px;
    font-size: 30px;
    padding: 3px 15px;
  margin-bottom: 10px;
}
#success_tic .checkmark-circle {
  width: 150px;
  height: 150px;
  position: relative;
  display: inline-block;
  vertical-align: top;
}
.checkmark-circle .background {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: #1ab394;
  position: absolute;
}
#success_tic .checkmark-circle .checkmark {
  border-radius: 5px;
}
#success_tic .checkmark-circle .checkmark.draw:after {
  -webkit-animation-delay: 300ms;
  -moz-animation-delay: 300ms;
  animation-delay: 300ms;
  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-timing-function: ease;
  -moz-animation-timing-function: ease;
  animation-timing-function: ease;
  -webkit-animation-name: checkmark;
  -moz-animation-name: checkmark;
  animation-name: checkmark;
  -webkit-transform: scaleX(-1) rotate(135deg);
  -moz-transform: scaleX(-1) rotate(135deg);
  -ms-transform: scaleX(-1) rotate(135deg);
  -o-transform: scaleX(-1) rotate(135deg);
  transform: scaleX(-1) rotate(135deg);
  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}
#success_tic .checkmark-circle .checkmark:after {
  opacity: 1;
  height: 75px;
  width: 37.5px;
  -webkit-transform-origin: left top;
  -moz-transform-origin: left top;
  -ms-transform-origin: left top;
  -o-transform-origin: left top;
  transform-origin: left top;
  border-right: 15px solid #fff;
  border-top: 15px solid #fff;
  border-radius: 2.5px !important;
  content: '';
  left: 35px;
  top: 80px;
  position: absolute;
}

@-webkit-keyframes checkmark {
  0% {
    height: 0;
    width: 0;
    opacity: 1;
  }
  20% {
    height: 0;
    width: 37.5px;
    opacity: 1;
  }
  40% {
    height: 75px;
    width: 37.5px;
    opacity: 1;
  }
  100% {
    height: 75px;
    width: 37.5px;
    opacity: 1;
  }
}
@-moz-keyframes checkmark {
  0% {
    height: 0;
    width: 0;
    opacity: 1;
  }
  20% {
    height: 0;
    width: 37.5px;
    opacity: 1;
  }
  40% {
    height: 75px;
    width: 37.5px;
    opacity: 1;
  }
  100% {
    height: 75px;
    width: 37.5px;
    opacity: 1;
  }
}
@keyframes checkmark {
  0% {
    height: 0;
    width: 0;
    opacity: 1;
  }
  20% {
    height: 0;
    width: 37.5px;
    opacity: 1;
  }
  40% {
    height: 75px;
    width: 37.5px;
    opacity: 1;
  }
  100% {
    height: 75px;
    width: 37.5px;
    opacity: 1;
  }
}

    </style>


    <style>
        .heading {
            font-size: 11px;
        }

        .form-control {
            display: inline;
            width: 127px;
            height: calc(0.5em + 0.75rem + 2px);
        }

        .lab {
            font-size: 15px;
            display: inline-block;
            font-weight: 400;
            color: #212529;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            background-color: transparent;
            border: 1px solid transparent;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            line-height: 0.5;
            border-radius: 0.25rem;
            transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        }

        .card {
            box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
            margin-top: 20px;
            background-color: #F8F7F7;
            /*  width:60%;*/
        }

        .hi {
            background-color: #63432a;
            margin-bottom: 10px;
            color: white;
        }

        .ui-datepicker-calendar {
            display: none;
        }

        /* CSS */
        .button-35 {
            align-items: center;
            background-color: #fff;
            border-radius: 12px;
            box-shadow: transparent 0 0 0 3px,rgba(18, 18, 18, .1) 0 6px 20px;
            box-sizing: border-box;
            color: #121212;
            cursor: pointer;
            display: inline-flex;
            flex: 1 1 auto;
            font-family: Inter,sans-serif;
            font-size: 1rem;
            font-weight: 700;
            justify-content: center;
            line-height: 1;
            margin: 0;
            outline: none;
            padding: 1rem 1.2rem;
            text-align: center;
            text-decoration: none;
            transition: box-shadow .2s,-webkit-box-shadow .2s;
            white-space: nowrap;
            border: 0;
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
        }

            .button-35:hover {
                box-shadow: #121212 0 0 0 3px, transparent 0 0 0 0;
            }
    </style>


    <div class="container card">


        <div class="row">
            <div class="col-12 hi">
                <h2>Incentive Setup</h2>

            </div>

        </div>

        <div class="row" style="margin-bottom: 17px;">

            <div class="col-12 center">

                <b style="margin-right: 57px;">Date: </b>


                <asp:TextBox class="form-control" runat="server" ID="txt_datefrom" ClientIDMode="Static"></asp:TextBox>
                <asp:CalendarExtender Format="yyyy" runat="server" DefaultView="Years" TargetControlID="txt_datefrom"></asp:CalendarExtender>







            </div>

        </div>


        <div class="row" style="margin-bottom: 17px;">

            <div class="col-12">

                <b style="margin-right: 8px;">Employee Type:</b>
                <select id="ddltype" class="dropdown show">
                    <option value="-1">Select Type</option>
                    <option value="1">Confirmed Employee</option>
                    <option value="0">Not Confirmed Employee</option>
                </select>

            </div>

        </div>

        <div class="row">

            <div class="col-2 mr-5" name="a">
                <table class="a">
                    <tr>
                        <td class="heading">Months</td>
                    </tr>
                    <tr>

                        <td>
                            <asp:Label CssClass="lab" runat="server">July</asp:Label></td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label CssClass="lab" runat="server">August</asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label CssClass="lab" runat="server">September</asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label CssClass="lab" runat="server">October</asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label CssClass="lab" runat="server">November</asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label CssClass="lab" runat="server">December</asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label CssClass="lab" runat="server">January</asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label CssClass="lab" runat="server">February</asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label CssClass="lab" runat="server">March</asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label CssClass="lab" runat="server">April</asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label CssClass="lab" runat="server">May</asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label CssClass="lab" runat="server">June</asp:Label>
                        </td>
                    </tr>

                </table>

            </div>





            <div class="col-2" id="Group" name="a">
                <table class="a">

                    <tr>
                        <td class="heading">Group Achievement</td>
                    </tr>

                    <tr>

                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt11"  />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt12" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt13" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt14" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt15" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt16" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt17" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt18" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt19" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt110" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt111" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt112" />
                        </td>
                    </tr>

                </table>



            </div>

            <div class="col-2" id="zero" name="b">
                <table class="a">

                    <tr>
                        <td class="heading">Portfolio Achievement 0 Under</td>
                    </tr>

                    <tr>

                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt21" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt22" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt23" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt24" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt25" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt26" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt27" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt28" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt29" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt210" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt211" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt212" />
                        </td>
                    </tr>

                </table>



            </div>

            <div class="col-2" id="Full" name="b">
                <table class="b">

                    <tr>
                        <td class="heading">Portfolio Achievement Full Over</td>
                    </tr>


                    <tr>

                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt31" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt32" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt33" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt34" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt35" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt36" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt37" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt38" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt39" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt310" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt311" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt312" />
                        </td>
                    </tr>

                </table>



            </div>


            <div class="col-2" id="confrim" name="b">
                <table class="b">

                    <tr>
                        <td class="heading">Portfolio Achievement Half Under</td>
                    </tr>

                    <tr>

                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt41" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt42" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt43" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt44" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt45" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt46" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt47" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt48" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt49" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt410" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt411" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" onkeypress="return isNumber(event)" class="form-control" id="txt412" />
                        </td>
                    </tr>

                </table>



            </div>



        </div>

        <div class="row" id="btn">

            <div class="col-12 left">

                <input type="button" id="btnsave" value="Save" style="margin-top: 10px" class="button-35" />

            </div>

        </div>


        <div id="success_tic" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <a class="close" href="#" data-dismiss="modal">&times;</a>
                <div class="page-body">
                    <div class="head">
                        <h3 style="margin-top: 5px;">Data Uploaded</h3>
                        <h4>Successfully!</h4>
                    </div>

                    <h1 style="text-align: center;">
                        <div class="checkmark-circle">
                            <div class="background"></div>
                            <div class="checkmark draw"></div>
                        </div>
                        </h1>
                </div>
            </div>
        </div>

    </div>



     <div id="myModal" class="modal fade">
	<div class="modal-dialog modal-confirm">
		<div class="modal-content">
			<div class="modal-header justify-content-center">
				<div class="icon-box">
					<i class="material-icons">&#xE5CD;</i>
				</div>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body text-center">
				<h4>Ooops!</h4>	
				<p>Something went wrong. Data was not uploaded.</p>
				<button class="btn btn-success" data-dismiss="modal">Try Again</button>
			</div>
		</div>
	</div>
</div>     

        
 



    </div>





    <%--<div class="innerBox">
        <div id="Div1" class="wrapper-inner">
            <div class="wrapper-inner-left">
                <div class="ghierarchy">
                    <div class="inner-head">
                        <h2>Incentive Setup</h2>
                    </div>

                    <div class="row">
                        <div class="inner-left">

                            <table>
                                <tr>
                                    <td><b>Year: </b></td>
                                    <td>
                                        <asp:TextBox runat="server" ID="txt_datefrom"></asp:TextBox>
                                        <asp:CalendarExtender Format="yyyy" runat="server" DefaultView="Months" TargetControlID="txt_datefrom"></asp:CalendarExtender>

                                    </td>
                                                          
                                </tr>

                            </table>

                        </div>

                    </div>


                    <div class="row">

                        <div class="inner-left">
                            <left>
                                <h4>Confirmed Employee</h4>
                            </left>
                        </div>
                        <div id="boxes" class="inner-left">
                            <div class="inner-left" style="display: inline">

                                <table class="table">

                                    <tr>
                                        <td></td>
                                        <td>
                                            <b>Gourp Achievement</b>
                                        </td>
                                        <td>
                                            <b>Portfolio Achievement Zero Under</b>
                                        </td>
                                
                                        <td></td>
                                        <td>
                                            <b>Portfolio Achievement Full Under</b>
                                        </td>
                                        <td>
                                            <b>Portfolio Achievement Half Under</b>
                                        </td>

                                    </tr>


                                </table>



                            </div>

                        </div>

                    </div>









                </div>
            </div>
        </div>
    </div>--%>
</asp:Content>


