<%@ Page Title="Sales Territory Brick Relation" Language="C#" MasterPageFile="~/MasterPages/Home.Master" AutoEventWireup="true" CodeBehind="SalesTerritoryBrickRelation.aspx.cs" Inherits="PocketDCR2.BWSD.SalesTerritoryBrickRelation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
       <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" type="text/css" />
    <%--<link rel="stylesheet" href="http://fortawesome.github.io/Font-Awesome/assets/font-awesome/css/font-awesome.css" type="text/css" />--%>
    <link href="../assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets//global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/plugins/clockface/css/clockface.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/css/plugins.min.css" rel="stylesheet" type="text/css" />
    <%--<link href="../assets/global/css/components.min.css" rel="stylesheet" type="text/css" />--%>
    <link href="../assets/global/css/components-rounded.min.css" rel="stylesheet" type="text/css"  />
    <link href="../assets/global/toastr/toastr.min.css" rel="stylesheet" />

      <script src="../Scripts/jquery-1.12.4.js"  type="text/javascript"></script>
    <script src="../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js" type="text/javascript"></script>
     <link href="../Scripts/datatable/jquery.dataTables.min.css" rel="stylesheet" />
    <script src="../Scripts/datatable/jquery.dataTables.min.js" type="text/javascript"></script>
    <script src="../assets/global/toastr/toastr.min.js" type="text/javascript"></script>
    <link href="../assets/global/plugins/fancybox/source/jquery.fancybox.css" rel="stylesheet" />
    <script src="SalesTerritoryBrickRelation.js" type="text/javascript"></script>
    <script src="../assets/global/plugins/fancybox/source/jquery.fancybox.pack.js" type="text/javascript"></script>

       <script type="text/javascript" src="../Scripts/Uploadify/jquery.uploadify.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../Scripts/Uploadify/uploadify.css" />
    <script type="text/javascript" src="RegionToBrickRelationData.js"></script>
    <script src="../Scripts/curvycorners.src.js" type="text/javascript"></script>
    <script type="text/JavaScript">

        curvyCorners.addEvent(window, 'load', initCorners);

        function initCorners() {
            var settings = {
                tl: { radius: 10 },
                tr: { radius: 10 },
                bl: { radius: 10 },
                br: { radius: 10 },
                antiAlias: true
            }
            curvyCorners(settings, "#box");
        }

        $(document).ready(function () {
            var height = $('#box').innerHeight();
            //var height2 = height - 50 + "px"
            var height2 = "870px"
            var width = $('#box').innerWidth();
            $('.outerBox').css('width', width)
            $('#box').css('height', height2)
        });

    </script>
    <style type="text/css">
        #id-form th {
            width: 212px;
        }
        
        .loading {
            /* background: #000 url('../Images/loading_bar.gif') no-repeat 20px 18px;*/
            width: 254px;
            height: 80px;
            position: fixed;
            top: 43%;
            left: 50%;
            margin: -7px 0 0 -107px;
            z-index: 222;
            display: block;
            color: white;
            padding: 2%;
            background: #000;
        }

        .pre-txt {
            padding: 2%;
            text-align: center;
            font-size: 20px;
        }

        .pre-img {
            padding-left: 17px;
        }

        .loading1 {
            /* background: #000 url('../Images/loading_bar.gif') no-repeat 20px 22px;*/
            width: 254px;
            height: 50px;
            position: fixed;
            top: 43%;
            left: 50%;
            margin: -7px 0 0 -107px;
            z-index: 222;
            display: block;
            color: white;
            padding: 2%;
            background: #000;
        }

        .back {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            opacity: 0.8;
            filter: alpha(opacity=80);
            background-color: rgba(0, 0, 0, 0.5);
            width: 100%;
            z-index: 9999;
        }

        #uploadify {
            /*background: #FFFFFF;*/
            border-radius: 5px;
        }

            #uploadify:hover {
                /*background: #FFFFFF;*/
            }

            #uploadify object {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 25px;
            }

        #ContentPlaceHolder1_cTextDate_body {
            height: 175px !important;
        }


        .more {
            cursor: pointer;
        }

        .customdown {
            background-color: #505050;
            background-image: -moz-linear-gradient(center bottom, #505050 0%, #707070 100%);
            background-position: center top;
            background-repeat: no-repeat;
            border: 2px solid #808080;
            border-radius: 30px;
            color: #fff;
            font: bold 12px Arial,Helvetica,sans-serif;
            /*height: 50px;*/
            text-align: center;
            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
            width: 143px;
            padding: 4px 0;
            color: #fff;
            font: bold 12px Arial,Helvetica,sans-serif;
            text-align: center;
            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

        <%--progress while uploading--%>
    <div class="pop_box-outer back" style="display:none;" id="dialog">
        <div class="loading" style="font-family: Arial; font-size: larger;">
            <p class="pre-txt">Region to Brick Data Uploading...</p>
            <div class="pre-img">
                <img src="../Images/loading_bar.gif" />
            </div>
        </div>
        <div class="clear">
        </div>
    </div>

    <%--process while processing--%>
    <div class="pop_box-outer back" style="display:none;"  id="dialog1">
        <div class="loading1" style="font-family: Arial; font-size: larger;">
            <p class="pre-txt">Region to Brick Processing...</p>
            <div class="pre-img">
                <img src="../Images/loading_bar.gif" />
            </div>
        </div>
        <div class="clear">
        </div>
    </div>
        <div style="height:15px"></div>
    <div class="page-head">
       <div class="container-fluid">
            <div class="page-title">
                <h1> <small>Sales Territory Brick Relation</small> </h1>
            </div>
              <div class="col-lg-4"></div>
           <div class="col-lg-8">
                <div class="col-lg-2"></div>
                <div class="col-lg-2 pull-right" id="uploadifyDSR"  style="display:inline;" >
                      
                    <div id="uploadify_button2" class="customdown">
                        <span class="uploadify-button-text" style="height: 50px;"></span>
                    </div>
                </div>

                <div class="col-lg-2 pull-right" >
                   
                            <div id="exportExcel" class="uploadify-button more" style="height: 25px; line-height: 25px; width: 140px;">
                              <span>Download Sample</span>
                          </div>
                      </div>
                <div class="col-lg-2 pull-right" >
                
                            <div id="exportExcel2"  class="uploadify-button more" style="height: 25px; line-height: 25px; width: 140px;">
                              <span>Download Data</span>
                          </div>
                      </div>

           </div>
          
        </div>

        
    </div>
     <div class="page-content" style="background-color: #e0e0e0; padding: 15px 0;">
        <div class="container-fluid">
             <div class="portlet light bordered">
                   <div id="table" class="form-body">
                       
                    <div class="row">
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <div id="col111" class="form-group">
                                <label id="Label111" class="control-label">BUH Manager :</label>
                                <select id="ddl111" class="form-control input-sm">
                                    <option value="-1">Select..</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <div id="col222" class="form-group">
                                <label id="Label222" class="control-label">GM Manager :</label>
                                <select id="ddl222" class="form-control input-sm">
                                    <option value="-1">Select..</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <div id="col333" class="form-group">
                                <label id="Label333" class="control-label">National :</label>
                                <select id="ddl333" class="form-control input-sm">
                                    <option value="-1">Select..</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <div id="col444" class="form-group">
                                <label id="Label444" class="control-label">Region :</label>
                                <select id="ddl444" class="form-control input-sm">
                                    <option value="-1">Select..</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <div id="col555" class="form-group">
                                <label id="Label555" class="control-label">Zone :</label>
                                <select id="ddl555" class="form-control input-sm">
                                    <option value="-1">Select..</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <div id="col666" class="form-group">
                                <label id="Label666" class="control-label">Terrritory :</label>
                                <select id="ddl666" class="form-control input-sm">
                                    <option value="-1">Select..</option>
                                </select>
                            </div>
                        </div>

                    </div>

                       <div class="row">
                           <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                               <div id="collimit" class="form-group">
                                   <label id="Labelimit" class="control-label">Percentage :</label>
                                   <select id="ddlimit" class="form-control input-sm">
                                       <option value="-1">Select..</option>
                                       <option value="0">All</option>
                                       <option value="1">Equal 100</option>
                                       <option value="2">Less than 100</option>
                                   </select>
                               </div>
                           </div>
                           <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                               <div id="collim" class="form-group">
                                   <label id="Labelim" class="control-label"></label>
                                   <input id="btnsubmitbrickdata" name="ShowResult" class="btn btn-primary  input-sm" value="Show Result" onclick="GetAlldata()" type="button" />
                               </div>
                           </div>
                       </div>
                       </div>
                       <div class="row">
                           <div id="teritorydetail" class="col-sm-12"></div>
                       </div>
                </div>
                 </div>
            <div class="portlet light bordered">
                <div id="hirarchy" class="form-body">
                    <div class="row">
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <div id="col1" class="form-group">
                                <label id="Label1" class="control-label">Region :</label>
                                <select id="ddl1" class="form-control input-sm">
                                    <option value="-1">Select..</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <div id="col2" class="form-group">
                                <label id="Label2" class="control-label">Sub Region :</label>
                                <select id="ddl2" class="form-control input-sm">
                                    <option value="-1">Select..</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <div id="col3" class="form-group">
                                <label id="Label3" class="control-label">District :</label>
                                <select id="ddl3" class="form-control input-sm">
                                    <option value="-1">Select..</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <div id="col4" class="form-group">
                                <label id="Label4" class="control-label">City :</label>
                                <select id="ddl4" class="form-control input-sm">
                                    <option value="-1">Select..</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <div id="col5dist" class="form-group">
                                <label id="Label4dist" class="control-label">Distributors :</label>
                                <select id="ddlDistributors" class="form-control input-sm">
                                    <option value="-1">Select Distributors First</option>
                                </select>
                            </div>
                        </div>


                    </div>

                    <div class="row">
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <div id="col11" class="form-group">
                                <label id="Label11" class="control-label">BUH Manager :</label>
                                <select id="ddl11" class="form-control input-sm">
                                    <option value="-1">Select..</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <div id="col22" class="form-group">
                                <label id="Label22" class="control-label">GM Manager :</label>
                                <select id="ddl22" class="form-control input-sm">
                                    <option value="-1">Select..</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <div id="col33" class="form-group">
                                <label id="Label33" class="control-label">National :</label>
                                <select id="ddl33" class="form-control input-sm">
                                    <option value="-1">Select..</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <div id="col44" class="form-group">
                                <label id="Label44" class="control-label">Region :</label>
                                <select id="ddl44" class="form-control input-sm">
                                    <option value="-1">Select..</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <div id="col55" class="form-group">
                                <label id="Label55" class="control-label">Zone :</label>
                                <select id="ddl55" class="form-control input-sm">
                                    <option value="-1">Select..</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <div id="col66" class="form-group">
                                <label id="Label66" class="control-label">Terrritory :</label>
                                <select id="ddl66" class="form-control input-sm">
                                    <option value="-1">Select..</option>
                                </select>
                            </div>
                        </div>

                    </div>

                    <div class="row">
                        <div id="List1" class="col-sm-3">
                            <select multiple="" id='listbox1' class="form-control" style="height: 250px;">
                                <option value="-1">- Please Select Distributors From Dropdown -</option>
                            </select>
                        </div>
                        <div class="col-sm-1" style="padding-top: 50px; padding-left: 50px;">
                            <input class="btn blue" id="btnRight" type="button" onclick="SaveData(); return false;" value=" > " />
                            <div style="padding: 5px 0;"></div>
                            <input class="btn blue " id="btnLeft" type="button" onclick="DeleteData(); return false;" value=" < " style="display: block;" />
                        </div>
                        <div class="col-sm-3">
                            <select multiple="" id='listbox2' class="form-control" style="height: 250px;">
                                <option value="-1">- Territory Sale Brick -</option>
                            </select>
                        </div>

                        <div class="col-sm-2">
                            <div id="col44per" class="form-group ">
                                <label id="Label44per" class="control-label">Brick Percentage % :</label>
                                <input id="inpSalesPercent" placeholder="Enter Percentage %" class="form-control input-sm" onkeypress="return check(event,value)" onkeyup="checkLength()" type="text" />

                            </div>
                        </div>
                    </div>



                </div>
            </div>
         </div>
        
    
  

</asp:Content>
