<%@ Page Title="Side Menu" Language="C#" MasterPageFile="~/MasterPages/HomeBoot.Master" AutoEventWireup="true" CodeBehind="BootStrep.aspx.cs" Inherits="PocketDCR2.Form.BootStrep" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Side Menu</title>
    <link href="../Content/bootstrap.css" rel="stylesheet" />
    <link href="../Content/bootstrap.min.css" rel="stylesheet" />
    <link href="../Content/menu.css" rel="stylesheet" />
    <script src="../Scripts/json-minified.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
    <script src="../BootScripts/WebForms/sideMenu.js"></script>
    <script src="../BootScripts/bootstrap.js"></script>
    <script src="../BootScripts/bootstrap.min.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="container-fluid">
        <div class="col-md-12">
           <%--<h2>George Kaplan</h2>--%>
        </div>
        <div class="col-md-3" style="margin-top:20px;">
            <div class="well well-lg">
                <ul class="nav nav-list nav-list-main">

                    <li>
                        <label class="tree-toggler nav-header nav-toggle" onclick="showexecutive()"><span></span><a href="#" class="lead">Akhter Hassan</a></label>
                        <ul class="tree">
                            <li>
                                <label class="tree-toggler nav-header " onclick="trevermanager()"><span></span><a href="#">Mohammad Kashif  Makhdoom </a></label>
                                <ul class="tree">
                                    <li>
                                        <label class="tree-toggler nav-header" onclick="RSM1FLM1()"><span></span><a href="#"><small>Muhammad  Fakharuddin </small></a></label>
                                    <%--    <ul class="tree">
                                            <li><a href="#"><small>Zeeshan  Khan </small></a></li>
                                            <li><a href="#"><small>Ashique Ali Soomro </small></a></li>
                                            <li><a href="#"><small>Syed Waqar Ali </small></a></li>
                                            <li><a href="#"><small>Abdul Fahad  Khan </small></a></li>
                                            <li><a href="#"><small>Faysal  Butt </small></a></li>
                                        </ul>--%>
                                    </li>
                                    <li>
                                        <label class="tree-toggler nav-header" onclick="RSM1FLM2()"><span></span><a href="#"><small>Dilawar  Ali  </small></a></label>
                                      <%--  <ul class="tree">
                                            <li><a href="#"><small>Naveed Ahmed Shaikh </small></a></li>
                                            <li><a href="#"><small>Rashid Saleh Siyal </small></a></li>
                                            <li><a href="#"><small>Javed  Iqbal </small></a></li>
                                        </ul>--%>
                                    </li>
                                    <li>
                                        <label class="tree-toggler nav-header" onclick="RSM1FLM3()"><span></span><a href="#"><small>Muhammad Arshad  Bhutta </small></a></label>
                                    <%--    <ul class="tree">
                                            <li><a href="#"><small>Aslam  Malik</small></a></li>
                                            <li><a href="#"><small>Amna  Sadia </small></a></li>
                                            <li><a href="#"><small></small>Asim Khan Babar</a></li>
                                        </ul>--%>
                                    </li>
                                    <li>
                                        <label class="tree-toggler nav-header" onclick="RSM1FLM14()"><span></span><a href="#"><small>Muhammad Ibrahim Bhukhari</small></a></label>
                                        <%--<ul class="tree">
                                            <li><a href="#"><small>Faiz Ahmed Siddiqui</small></a></li>
                                            <li><a href="#"><small>Noman  Azeem </small></a></li>
                                            <li><a href="#"><small>Zia  Anjum</small></a></li>
                                            <li><a href="#"><small>Shan Raza Khan</small></a></li>
                                            <li><a href="#"><small>Rizwan  Riaz </small></a></li>
                                            <li><a href="#"><small>Syed Muhammad  Ali Abidi </small></a></li>
                                            <li><a href="#"><small>Nida  Zehra </small></a></li>
                                        </ul>--%>
                                    </li>

                                </ul>
                            </li>
                            <li>
                                <label class="tree-toggler nav-header " onclick="simsonmanager()"><span></span><a href="#">Shaikh Rashid Javed</a></label>
                                <ul class=" tree ">
                                    <%-- <li class="treeview"><label class="tree-toggler nav-header " onclick="RSM2FLM1()" ><span ></span><a href="#">Muhammed Kamran Younas</a></label>--%>

                                    <li>
                                        <label class="tree-toggler nav-header " onclick="RSM2FLM1()"><span></span><a href="#"><small>Muhammad Kamran Younas </small></a></label>
                                        <%--<ul class=" tree ">
                                            <li><a href="#"><small>Amjad  Pervaiz </small></a></li>
                                            <li><a href="#"><small>Ayaz  Majeed  </small></a></li>
                                            <li><a href="#"><small>Furqan  Shaheen </small></a></li>
                                            <li><a href="#"><small>Naveed  Amir </small></a></li>
                                        </ul>--%>
                                    </li>
                                    <li>
                                        <label class="tree-toggler nav-header " onclick="RSM2FLM2()"><span></span><a href="#"><small>M Nasir Mian </small></a></label>
                                       <%-- <ul class=" tree ">
                                            <li><a href="#"><small>Muhammad  Mansoor </small></a></li>
                                            <li><a href="#"><small>Faizan  Ali </small></a></li>
                                            <li><a href="#"><small>Asghar  Khan </small></a></li>
                                            <li><a href="#"><small>Mohtaram  Shah</small> </a></li>
                                        </ul>--%>
                                    </li>
                                    <li>
                                        <label class="tree-toggler nav-header " onclick="RSM2FLM3()"><span></span><a href="#"><small>Saleem Khan </small></a></label>
                                      <%--  <ul class="tree ">
                                            <li><a href="#"><small>Naveed  Akhtar </small></a></li>
                                            <li><a href="#"><small>Muhammad Imran Afqar </small></a></li>
                                            <li><a href="#"><small>Hassan  Nawaz </small></a></li>
                                            <li><a href="#"><small>Mumtaz  Ali </small></a></li>
                                        </ul>--%>
                                    </li>
                                    <li>
                                        <label class="tree-toggler nav-header" onclick="RSM2FLM14()"><span></span><a href="#"><small>Tariq Ahmed Iqtadar </small></a></label>
                                     <%--   <ul class="tree ">
                                            <li><a href="#"><small>Farrukh  Aziz </small></a></li>
                                            <li><a href="#"><small>Muhammad Zubair  Alvi </small></a></li>
                                            <li><a href="#"><small>Bilal  Ahmed </small></a></li>
                                            <li><a href="#"><small>Kanwal  Maqsood </small></a></li>
                                            <li><a href="#"><small>Jawad  Awan </small></a></li>
                                        </ul>--%>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>

        <div class="col-md-12" id="container2" style="margin-top:20px;">
            <div class="col-sm-9 well well-lg container-fluid">
                <div class="row" id="executive">
                    <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="KevenHawes">
                        <div class=" row">
                            <div class="col-md-1">
                                <img src="src/George KaplanSmall.png" />
                            </div>
                            <div class="col-md-10 text-center h4">Akhtar  Hassan</div>

                        </div>

                        <%--          <div class="form-group ">--%>
                        <label class="col-xs-3">Email:</label>
                        <div class="col-sm-9">
                            <%-- <label>gpnsm@pocketdcr.com</label>--%>
                            <p>gpnsm@pocketdcr.com</p>
                        </div>
                        <%--     </div>--%>
                        <div class="form-group ">
                            <label class="col-xs-3 control-label">Phone:</label>
                            <div class="col-sm-9">
                                <%--<label >920000000000</label>--%>
                                <p>920000000000</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class=" col-xs-3 control-label">Title:</label>
                            <div class="col-sm-9">
                                <%--<label >NSM</label>--%>
                                <p>NSM</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row row-fluid" id="manager">
                    <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="TreverNotts">
                        <div class=" row">
                            <div class="col-md-1">
                                <img src="src/George KaplanSmall.png" />
                            </div>
                            <div class="col-md-10 control-label text-center h4">Muhammad Kashif Makhdoom</div>

                        </div>
                        <%--         <br />
             <br />--%>

                        <div class="form-group">
                            <label class="col-xs-3 control-label">Email:</label>
                            <div class="col-sm-9">
                                <%-- <label>Mohammed.kashif_makhdoom@novartis.com</label>--%>
                                <p>Mohammed.kashif_makhdoom@novartis.com </p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">Phone:</label>
                            <div class="col-sm-9">
                                <%--  <label >923008624487</label>--%>
                                <p>923008624487</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">Title:</label>
                            <div class="col-sm-9">
                                <%--  <label >SLM</label>--%>
                                <p>SLM</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="SimsonRozani">
                        <div class=" row">
                            <div class="col-md-1">
                                <img src="src/George KaplanSmall.png" />
                            </div>
                            <div class="col-md-10 text-center h4">Shaikh Rashid Javed</div>

                        </div>
                        <%--         <br />
             <br />--%>

                        <div class="form-group">
                            <label class="col-xs-3 control-label">Email:</label>
                            <div class="col-sm-9">
                                <%--<label>shaikh_rashid.javed@novartis.com</label>--%>
                                <p>shaikh_rashid.javed@novartis.com</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">Phone:</label>
                            <div class="col-sm-9">
                                <%--     <label >923028274350</label>--%>
                                <p>923028274350</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">Title:</label>
                            <div class="col-sm-9">
                                <%--  <label >SLM</label>--%>
                                <p>SLM</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row" id="regionalmanager">
                    <%-- manager 1--%>
                    <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="TreverRegional1">
                        <div class=" row">

                            <div class="col-md-1">
                                <img src="src/George KaplanSmall.png" />
                            </div>
                            <div class="col-md-10 text-center h4">Muhammad  Fakharuddin</div>

                        </div>
                        <%--         <br />
             <br />--%>

                        <div class="form-group">
                            <label class="col-xs-3 control-label">Email:</label>
                            <div class="col-sm-9">
                                <%--<label>fk356@yahoo.com.in</label>--%>
                                <p>fk356@yahoo.com.in</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">Phone:</label>
                            <div class="col-sm-9">
                                <%--  <label >923008214383</label>--%>
                                <p>923008214383</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">Title:</label>
                            <div class="col-sm-9">
                                <%--<label >FLM</label>--%>
                                <p>FLM</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="TreverRegional2">
                        <div class=" row">
                            <div class="col-md-1">
                                <img src="src/George KaplanSmall.png" />
                            </div>
                            <div class="col-md-10 text-center h4">Dilawar  Ali</div>

                        </div>
                        <%--         <br />
             <br />--%>

                        <div class="form-group">
                            <label class="col-xs-3 control-label">Email:</label>
                            <div class="col-sm-9">
                                <%--   <label>dilawaralinovartis@yahoo.com</label>--%>
                                <p>dilawaralinovartis@yahoo.com</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">Phone:</label>
                            <div class="col-sm-9">
                                <%--<label >486156465151</label>--%>
                                <p>486156465151</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">Title:</label>
                            <div class="col-sm-9">
                                <%-- <label >FLM</label>--%>
                                <p>FLM</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="TreverRegional3">
                        <div class=" row ">
                            <div class=" col-md-1">
                                <img src="src/George KaplanSmall.png" />
                            </div>

                            <div class="col-md-10 text-center h4">Muhammad Arshad Bhutta</div>

                        </div>
                        <%--         <br />
             <br />--%>

                        <div class="form-group">
                            <label class="col-xs-3 control-label">Email:</label>
                            <div class="col-sm-9">
                                <%-- <label>arshed.bhutta@yahoo.com</label>--%>
                                <p>arshed.bhutta@yahoo.com</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">Phone:</label>
                            <div class="col-sm-9">
                                <%--<label >(92) 307-666-0700</label>--%>
                                <p>(92) 307-666-0700</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">Title:</label>
                            <div class="col-sm-9">
                                <%-- <label >FLM</label>--%>
                                <p>FLM</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="TreverRegional4">
                        <div class=" row">
                            <div class="col-md-1">
                                <img src="src/George KaplanSmall.png" />
                            </div>
                            <div class="col-md-12 text-center h4">Muhammad Ibrahim Bhukhari</div>

                        </div>
                        <%--         <br />
             <br />--%>

                        <div class="form-group">
                            <label class="col-xs-3 control-label">Email:</label>
                            <div class="col-sm-9">
                                <%-- <label>ibrahim.bukhari@novartis.com</label>--%>
                                <p>ibrahim.bukhari@novartis.com</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">Phone:</label>
                            <div class="col-sm-9">
                                <%-- <label >923312046313</label>--%>
                                <p>923312046313</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">Title:</label>
                            <div class="col-sm-9">
                                <%--<label >FLM</label>--%>
                                <p>FLM</p>
                            </div>
                        </div>
                    </div>

                    <%--  manager 2--%>
                    <div class="col-md-10 well col-xlg-9 col-lg-4 block1" id="SimsonRegionsl1">
                        <div class=" row">
                            <div class="col-md-1">
                                <img src="src/George KaplanSmall.png" />
                            </div>
                            <div class="col-md-10 text-center h4">Muhammad Kamran Younas</div>

                        </div>
                        <%--         <br />
             <br />--%>

                        <div class="form-group">
                            <label class="col-xs-3 control-label">Email:</label>
                            <div class="col-sm-9">
                                <%--  <label>kamranyounas30@yahoo.com</label>--%>
                                <p>kamranyounas30@yahoo.com</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">Phone:</label>
                            <div class="col-sm-9">
                                <%--<label >923004197650</label>--%>
                                <p>923004197650</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">Title:</label>
                            <div class="col-sm-9">
                                <%--<label >FLM</label>--%>
                                <p>FLM</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-10 well col-xlg-9 col-lg-4 block1" id="SimsonRegionsl2">
                        <div class=" row">
                            <div class="col-md-1">
                                <img src="src/George KaplanSmall.png" />
                            </div>
                            <div class="col-md-10 text-center h4">M Nasir Mian</div>

                        </div>
                        <%--         <br />
             <br />--%>

                        <div class="form-group">
                            <label class="col-xs-3 control-label">Email:</label>
                            <div class="col-sm-9">
                                <%--<label>nasirmianpk@yahoo.com</label>--%>
                                <p>nasirmianpk@yahoo.com</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">Phone:</label>
                            <div class="col-sm-9">
                                <%--<label >923219151341</label>--%>
                                <p>923219151341</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">Title:</label>
                            <div class="col-sm-9">
                                <%--<label >FLM</label>--%>
                                <p>FLM</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-10 well col-xlg-9 col-lg-4 block1" id="SimsonRegionsl3">
                        <div class=" row">

                            <div class="col-md-1">
                                <img src="src/George KaplanSmall.png" />
                            </div>
                            <div class="col-md-10 text-center h4">Saleem  Khan</div>

                        </div>
                        <%--         <br />
             <br />--%>

                        <div class="form-group">
                            <label class="col-xs-3 control-label">Email:</label>
                            <div class="col-sm-9">
                                <%--<label>saleem_novartis@yahoo.com</label>--%>
                                <p>saleem_novartis@yahoo.com</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">Phone:</label>
                            <div class="col-sm-9">
                                <%--<label >923214435247</label>--%>
                                <p>923214435247</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">Title:</label>
                            <div class="col-sm-9">
                                <%--<label >FLM</label>--%>
                                <p>FLM</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-10 well col-xlg-9 col-lg-4 block1" id="SimsonRegionsl4">
                        <div class=" row">
                            <div class="col-md-1">
                                <img src="src/George KaplanSmall.png" />
                            </div>
                            <div class="col-md-10 text-center h4">Tariq Ahmed Iqtadar</div>

                        </div>
                        <%--         <br />
             <br />--%>

                        <div class="form-group">
                            <label class="col-xs-3 control-label">Email:</label>
                            <div class="col-sm-9">
                                <%--<label>tariq.iqtadar@gmail.com</label>--%>
                                <p>tariq.iqtadar@gmail.com</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">Phone:</label>
                            <div class="col-sm-9">
                                <%-- <label >923005164307</label>--%>
                                <p>923005164307</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">Title:</label>
                            <div class="col-sm-9">
                                <%-- <label >FLM</label>--%>
                                <p>FLM</p>
                            </div>
                        </div>
                    </div>



                </div>
                <%--child--%>
                <div id="employees">

                    <div class="regional1hierarchy">

                        <div class="row" id="TFLM1E1">
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Zeeshan  Khan</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--<label>zeeshankhan0336@yahoo.com</label>--%>
                                        <p>zeeshankhan0336@yahoo.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--<label >923332692992</label>--%>
                                        <p>923332692992</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Ashique Ali Soomro</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--<label>ashique.novartis@gmail.com</label>--%>
                                        <p>ashique.novartis@gmail.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--<label >923002339857</label>--%>
                                        <p>923002339857</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">
                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Syed Waqar Ali</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%-- <label>syedwaqar412@hotmail.com</label>--%>
                                        <p>syedwaqar412@hotmail.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >923332625171</label>--%>
                                        <p>923332625171</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%--<label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Abdul Fahad  Khan</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%-- <label>fahad.khan85@hotmail.com</label>--%>
                                        <p>fahad.khan85@hotmail.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--<label >923342026684</label>--%>
                                        <p>923342026684</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Faysal  Butt</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--<label>faysal.butt8216@yahoo.com</label>--%>
                                        <p>faysal.butt8216@yahoo.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--   <label >003342405816</label>--%>
                                        <p>003342405816</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" id="TFLM1E2">
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Naveed Ahmed Shaikh</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--<label>naveedshaikh12@hotmail.com</label>--%>
                                        <p>naveedshaikh12@hotmail.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--<label >923337176561</label>--%>
                                        <p>923337176561</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%--<label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Rashid Saleh Siyal</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--<label>siyalrashid71@yahoo.com</label>--%>
                                        <p>siyalrashid71@yahoo.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--<label >923013470841</label>--%>
                                        <p>923013470841</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Javed  Iqbal</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--   <label>siyalrashid71@yahoo.com</label>--%>
                                        <p>siyalrashid71@yahoo.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >923013470841</label>--%>
                                        <p>923013470841 </p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" id="TFLM1E3">
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Aslam  Malik</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%-- <label>aslammalikbwp@yahoo.com</label>--%>
                                        <p>aslammalikbwp@yahoo.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >923006834125</label>--%>
                                        <p>923006834125</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%--  <label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Amna  Sadia</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--<label>amnahussain17@gmail.com</label>--%>
                                        <p>amnahussain17@gmail.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--<label >923347104122</label>--%>
                                        <p>923347104122</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%--  <label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Asim Khan Babar</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--<label>asimkhan.novartis@gmail.com</label>--%>
                                        <p>asimkhan.novartis@gmail.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >923030771317</label>--%>
                                        <p>923030771317</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%--  <label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" id="TFLM1E4">
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Faiz Ahmed Siddiqui</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--<label>faiz.novartis@yahoo.com</label>--%>
                                        <p>faiz.novartis@yahoo.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--<label >923145033572</label>--%>
                                        <p>923145033572</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Noman  Azeem</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--<label>syedm_nomanazim@yahoo.com</label>--%>
                                        <p>syedm_nomanazim@yahoo.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--<label >923222687892</label>--%>
                                        <p>923222687892</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Zia  Anjum</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--<label>ziaanjum61@yahoo.com</label>--%>
                                        <p>ziaanjum61@yahoo.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >923002276625</label>--%>
                                        <p>923002276625</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%--<label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Shan Raza Khan</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--<label>shanrazakhan@yahoo.com</label>--%>
                                        <p>shanrazakhan@yahoo.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--<label >923242714907</label>--%>
                                        <p>923242714907</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%--<label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Rizwan  Riaz</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--<label>riz_adhvie@hotmail.com</label>--%>
                                        <p>riz_adhvie@hotmail.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--<label >923002873631</label>--%>
                                        <p>923002873631</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Syed Muhammad  Ali Abidi</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--<label>aliabidis@hotmail.com</label>--%>
                                        <p>aliabidis@hotmail.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >923332247714</label>--%>
                                        <p>923332247714</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Nida  Zehra</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--   <label>nidazehrazaidi@yahoo.com</label>--%>
                                        <p>nidazehrazaidi@yahoo.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--<label >923452672898</label>--%>
                                        <p>923452672898</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%--  <label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div class="regional2hierarchy">



                        <div class="row" id="SFLM2E1">
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="SFLM1E11">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Amjad  Pervaiz</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--  <label>amjadnovartis@gmail.com</label>--%>
                                        <p>amjadnovartis@gmail.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--<label >923228048255</label>--%>
                                        <p>923228048255</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="SFLM1E12">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Ayaz  Majeed</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--<label>ayazmajeed87@gmail.com</label>--%>
                                        <p>ayazmajeed87@gmail.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--<label >923216400926</label>--%>
                                        <p>923216400926</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%--<label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="SFLM1E13">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Furqan  Shaheen</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--<label>furqanshaheennovartis@gmail.com</label>--%>
                                        <p>furqanshaheennovartis@gmail.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--<label >923238852073</label>--%>
                                        <p>923238852073</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="SFLM1E14">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Naveed  Amir</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--<label>naveedamirnovartis@gmail.com</label>--%>
                                        <p>naveedamirnovartis@gmail.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >923217182801</label>--%>
                                        <p>923217182801</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" id="SFLM2E2">
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Muhammad  Mansoor</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%-- <label>mansoorm408@gmail.com</label>--%>
                                        <p>mansoorm408@gmail.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--<label >923469070917</label>--%>
                                        <p>923469070917</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%--<label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Faizan  Ali</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%-- <label>faizan_cooldude7@yahoo.com</label>--%>
                                        <p>faizan_cooldude7@yahoo.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >923319025184</label>--%>
                                        <p>923319025184</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%--    <label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Asghar  Khan</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--<label>asghar_9009@yahoo.com</label>--%>
                                        <p>asghar_9009@yahoo.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--<label >923018057825</label>--%>
                                        <p>923018057825</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%--<label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Mohtaram  Shah</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--<label>mohtarams@gmail.com</label>--%>
                                        <p>mohtarams@gmail.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--   <label >923009393208</label>--%>
                                        <p>923009393208</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%--<label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" id="SFLM2E3">
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Naveed  Akhtar</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--<label>naveed_kkk@hotmail.com</label>--%>
                                        <p>naveed_kkk@hotmail.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >923086498624</label>--%>
                                        <p>923086498624</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%--  <label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Muhammad Imran Afqar</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--<label>imran_afqar@yahoo.com</label>--%>
                                        <p>imran_afqar@yahoo.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--<label >923336733311</label>--%>
                                        <p>923336733311</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%--<label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Hassan  Nawaz</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--<label>hassan.novartis@gmail.com</label>--%>
                                        <p>hassan.novartis@gmail.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--<label >923134531091</label>--%>
                                        <p>923134531091</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%--<label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Mumtaz  Ali</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--<label>ali24183@yahoo.com</label>--%>
                                        <p>ali24183@yahoo.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--<label >923214604826</label>--%>
                                        <p>923214604826</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%--<label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" id="SFLM2E4">
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Farrukh  Aziz</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%-- <label>farrukh_zz@yahoo.com</label>--%>
                                        <p>farrukh_zz@yahoo.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--<label >923455078358</label>--%>
                                        <p>923455078358</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Muhammad Zubair  Alvi</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--<label>muhammad.zubairalvi6@gmail.com</label>--%>
                                        <p>muhammad.zubairalvi6@gmail.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--<label >923135255606</label>--%>
                                        <p>923135255606</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%--   <label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Bilal  Ahmed</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--  <label>bilal5618837@gmail.com</label>--%>
                                        <p>bilal5618837@gmail.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--<label >923455618837</label>--%>
                                        <p>923455618837</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%--<label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Kanwal  Maqsood</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--  <label>kanwalmalik007@yahoo.com</label>--%>
                                        <p>kanwalmalik007@yahoo.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%--  <label >923367775269</label>--%>
                                        <p>923367775269</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-10 well col-xlg-9 col-lg-6 block1" id="">
                                <div class=" row">

                                    <div class="col-md-1">
                                        <img src="src/George KaplanSmall.png" />
                                    </div>
                                    <div class="col-md-10 text-center h4">Jawad  Awan</div>

                                </div>
                                <%--         <br />
             <br />--%>

                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Email:</label>
                                    <div class="col-sm-9">
                                        <%--<label>923455516111@pocketdcr.com</label>--%>
                                        <p>923455516111@pocketdcr.com</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Phone:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >923455516111</label>--%>
                                        <p>923455516111</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">Title:</label>
                                    <div class="col-sm-9">
                                        <%-- <label >MedRep</label>--%>
                                        <p>MedRep</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            </div>


        </div>
    </div>

</asp:Content>
