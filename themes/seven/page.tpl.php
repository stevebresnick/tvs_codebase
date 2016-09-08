<script>
    function GetQueryStringByParam(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }    
</script>
<?php   
    global $base_url;
    $primaryApp = strtolower(db_query("SELECT value FROM tvs_config WHERE name = 'primary_app'")->fetchField());

if ($_SERVER["REQUEST_URI"] == "/") {
    echo '<script>window.location.href="/dashboard";</script>';
}

?>

<?php
$userEmails = "anonymous@interactivecontentcreator.com";
$all_users = entity_load('user');
foreach($all_users as $value) {
    $user_list = (array)$value;
    if ($user_list['status'] == "1") {
        if ($userEmails !== "") { $userEmails .= ",";}
        $userEmails .= $user_list['mail'];
    }
}

echo '<input type="hidden" id="userEmailList" value="' . $userEmails . '" />';
?>


<div id="page-container">
    <?php if (theme_get_setting('scrolltop_display')): ?>
    <div id="toTop"><i class="fa fa-angle-up"></i></div>
    <?php endif; ?>

    <!-- #header -->

   <?php if($logged_in == TRUE){ ?> 
    <header id="header"  role="banner" class="clearfix">
         <?php if($is_admin == TRUE){ ?>
                             <div class="header_margin" style="margin-top:21px;"></div>   
         <?php } ?>
        <div class="wrapper-seven">

            <!-- #header-inside -->


            
                <div class="row">
                   
                   <div class="logo">
                       <?php
                            $primaryAppLogo = $base_url . "/sites/default/files/images/tvs.jpg";
                            if ($primaryApp === "showpad") {
                                $primaryAppLogo = $base_url . "/sites/default/files/images/showpad.png";
                            }
                        ?>
                            <img src="<?php echo $primaryAppLogo; ?>">                        
                    </div>                   

                    <div class="header_top">
                      <div class="header_top_left">
                         <span><a href="<?php echo $base_url; ?>"><?php print t($site_name);?> </a></span>
                      </div>
                      <?php //echo "<pre>".print_r($user,"/n")."</pre>"; ?>
                      <div class="cust-border">
  
                      </div>

                       <div class="header_top_right">
                           <div class="name">
                              <i class="fa fa-user cust-profile"></i>
                              <div class="select_div">
                                 <span>
                                     <a style="color:white;text-decoration:none;" href="https://dev.apppublisher.biz/user/<?php echo $user->uid; ?>/edit">
                                        <?php print isset($user->name)?ucfirst($user->name):""; ?>
                                     </a>
                                 </span>
                              </div>  

                           </div>
                           <div class="icon">
                             <i class="fa fa-cog cust-user"></i>
                                <div class="select_div">
                                      <div class="btn-group">
                                      <button type="button" class="btn btn-default dropdown-toggle manage_permission" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="caret"></span>
                                      </button>
                                      <ul class="dropdown-menu display_permission">
                                          <?php if(($is_admin == TRUE)||(in_array("Company Administrator", $user->roles))){ ?>
                                        <li><a href="<?php echo $base_url?>/all-users">Manage Users</a></li>
                                        <li><a href="<?php echo $base_url; ?>/approved-showpad-tags">Manage Tags</a></li>
                                        <li><a href="<?php echo $base_url; ?>/manage-system-settings">Manage System Settings</a></li>
                                        <li><a href="<?php echo $base_url; ?>/manage-lrs-settings">Manage LRS Settings</a></li>
                                          <?php } ?>
                                          <li><a href="<?php echo $base_url; ?>/user/logout">Logout</a></li>
                                      </ul>
                                  </div>
                                  </div>
                           </div>
                           <div class="help">
                              <a href="mailto:support@interactivecontentcreator.com"><i class="fa fa-question-circle cust-user" style="cursor:pointer;"></i></a>
                           </div>
                      </div>
                    </div>
                    <?php 
                    $createclass = ($_SERVER["REQUEST_URI"] == '')?"active":"";
                    $create_content = explode('/', url($_GET['q'])); ?>
                      <div class="tabs">
                        <ul class="tab-links">
                            <?php if((in_array("Company Administrator", $user->roles))||($is_admin == TRUE)){ ?>
                            <li class="<?php echo $_SERVER["REQUEST_URI"] == '/dashboard'?'active':'' ?>"><a href="<?php echo $base_url; ?>/dashboard">Dashboard</a></li>
                        <?php } ?>    
                            <li class="<?php echo strpos($_SERVER["REQUEST_URI"],'/manage-content') === 0?'active':''; ?>"><a href="<?php echo $base_url; ?>/manage-content<?php echo isset($_GET["nb"]) ? "?nb" : "" ?>">All Content</a></li>
                        <?php if(in_array("Interactive Author", $user->roles)){ ?>
                            <li class="<?php echo strpos($_SERVER["REQUEST_URI"],'/my-content') === 0?'active':'' ?>"><a href="<?php echo $base_url; ?>/my-content<?php echo isset($_GET["nb"]) ? "?nb" : "" ?>">My Content</a></li>
                        <?php } ?>
                        <?php if(in_array("Interactive Author", $user->roles)){ ?>
                            <li class="<?php echo strpos($_SERVER["REQUEST_URI"],'/node/add') === 0?'active':''; ?>"><a href="<?php echo $base_url; ?>/node/add<?php echo isset($_GET["nb"]) ? "?nb" : "" ?>">Create Content</a></li>
                        <?php } ?>
                        <?php if(($is_admin == TRUE)||(in_array("Company Administrator", $user->roles))){ ?>
                            <li class="<?php echo $_SERVER["REQUEST_URI"] == '/viewing-report'?'active':''; ?>"><a href="/viewing-report">Reports</a></li>
                        <?php } ?>
                        </ul>
                     
                        <div class="tab-content">
                            <div id="tab1" class="tab active">
                                
                            </div>
                     
                            <div id="tab2" class="tab">
                               
                            </div>
                     
                            <div id="tab3" class="tab">
                                
                            </div>
                     
                            <div id="tab4" class="tab">
                                
                            </div>
                        </div>
                    </div>

    
               </div>   
        </div>
    </header>
   <?php }else{ ?>
         <div class="margin_header" style="margin-top:100px;"></div>   
   <?php } ?> 
    <!-- EOF: #header -->

  <div id="branding" class="clearfix">
        <?php if ($logo):?>
            <div id="custLogo">
            <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"> <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" /></a><br />
                <div id="site-slogan">
                    <?php print $site_slogan; ?>
                    <br /><br />
                </div>
            </div>
        <?php endif; ?>      
  </div>

  <div id="page">
    <?php if ($secondary_local_tasks): ?>
      <div class="tabs-secondary clearfix"><?php print render($secondary_local_tasks); ?></div>
    <?php endif; ?>

    <div id="content" class="clearfix">
      <div class="element-invisible"><a id="main-content"></a></div>
      <?php if ($messages): ?>
        <div id="console" class="clearfix"><?php print $messages; ?></div>
      <?php endif; ?>
      <?php if ($page['help']): ?>
        <div id="help">
          <?php print render($page['help']); ?>
        </div>
      <?php endif; ?>
      <?php if ($action_links): ?><ul class="action-links"><?php print "render($action_links);" ?></ul><?php endif; ?>
        
      <?php print render($page['content']); ?>
    </div>

    <div id="footer">
      <?php print $feed_icons; ?>
    </div>
  </div>
</div> 

<div id='approvedContent' style="display:none;position:fixed;top:50px;left:200px;border: 5px solid gray;background:white !important;width:750px;height:500px;z-index:9999">
    <div style="font-weight:700;width: 100%;background:gray;color:white;" onclick="document.getElementById('approvedContent').style.display='none';"><span id="previewFrameTitle" style="text-align:left;"></span><span style="cursor:pointer;float:right;color:gray;padding-right:15px;">CLOSE</span></div>
<?php
if (strpos($_SERVER["REQUEST_URI"],'/node') === 0) { 
?>
    <strong><em><span style="font-size:2.0em;">Coming soon...</span></em></strong>
<?php
}
?>
</div>
        
<div id='tvsGuestbook' style="display:none;position:fixed;top:0%;left:0%;border: 5px solid gray;background:white !important;width:100%;height:100%;z-index:9999">
    <table>
        <tr>
            <td colspan='2' style='font-weight:700;font-size:1.2em;'>Please enter your name and email address</td>
        </tr>    
        <tr>
            <td>Email Address</td>
            <td><input type='text' id='userEmail' /> * </td>
        </tr>    
        <tr>
            <td>Full Name</td>
            <td><input type='text' id='userFullName' /></td>
        </tr>
        <tr>
            <td colspan=2>
                <input type=button value='View Content' onclick='guestbookSubmit();' />
            </td>
        </tr>
    </table>
</div>

<div id='previewWindow' style="display:none;position:fixed;top:20%;left:30%;border: 5px solid gray;background: white !important;">
    <div style="font-weight:700;width: 100%;height:25px;background:gray;color:white;" onclick="document.getElementById('previewWindow').style.display='none';"><span id="previewFrameTitle" style="text-align:left;"></span><span style="cursor:pointer;float:right;padding-right:15px;">CLOSE</span></div>
    <style>::-webkit-scrollbar {width: 10px;height: 10px;display: none; }::-webkit-scrollbar-track-piece  {background-color: #3b3b3b;-webkit-border-radius: 16px;}::-webkit-scrollbar-thumb:vertical {height: 50px;background-color: #666;border: 1px solid #eee;-webkit-border-radius: 6px;}</style><iframe id='previewFrame' src="" width="510" height="340" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
</div>
    

        
<script>

var bodyElement = document.body;
if (bodyElement.className.indexOf("not-logged-in") === -1) {
    var topRegions = document.getElementsByClassName("region-page-top");
    for (var j=0;j<topRegions.length;j++){
        topRegions[j].parentNode.removeChild(topRegions[j]);
    }
    
    try {
            window.frames[0].document.getElementsByClassName("h5p-interactive-video")[0].style.maxWidth="800px";
        }
        catch (err) { console.log(err.message);}
    
    if(window.location.href.indexOf("/node") > -1) {
        H5P.jQuery('.field').remove();
    }
}
else {
    if(window.location.href.indexOf("/node") > -1) {
        console.log("This is a /node page, if login form is there remove it...");
        var loginForm = document.getElementById("block-user-login");
        if (loginForm !== null) {
            loginForm.parentNode.removeChild(loginForm);
        }
    }
    if (document.getElementById("page-title") !== null) {document.getElementById("page-title").style.display = "none";}
    if (document.getElementById("nodeExtraInfo") !== null) {document.getElementById("nodeExtraInfo").style.display = "none";}
    if (document.getElementById("footer") !== null) {document.getElementById("footer").style.display = "none";}
    if(window.location.href.indexOf("/node") > -1) {
        H5P.jQuery('.field').remove();
    }
}

<?php if(isset($_GET["nb"])) { ?>
    if (document.getElementById("admin-menu") !== null) {document.getElementById("admin-menu").style.display = "none";}
<?php } ?>

for (var i=0; i<document.getElementsByClassName('appImg').length;i++) {
    if (i > 0) { document.getElementsByClassName('appImg')[i].style.display='none'; }
}
    
if(window.location.href.indexOf("overlay=") > -1) {
    document.getElementById('tvs').style.display='none';
}
    
if ((document.getElementsByClassName("tabs primary").length === 1) && (window.location.href.indexOf("/user/") === -1)) {
    var newLIReport = document.createElement("li");
    newLIReport.innerHTML = "<a href='" + getReportUrl() + "'>Report</a>";
    document.getElementsByClassName("tabs primary")[0].appendChild(newLIReport);
    
    <?php
        if ($primaryApp !== "showpad") {
    ?>
    var newLIEmbed = document.createElement("li");
    newLIEmbed.innerHTML = "<a href='#' onclick='displayEmbedDialog()'>Embed</a>";
    document.getElementsByClassName("tabs primary")[0].appendChild(newLIEmbed);
    
    var newLIDownload = document.createElement("li");
    newLIDownload.innerHTML = "<a href='#' onclick='downloadContent()'>Download</a>";
    document.getElementsByClassName("tabs primary")[0].appendChild(newLIDownload);
    <?php
        }
    ?>
    
    <?php
        if ($primaryApp === "showpad") {
    ?>
        var newLIShowPadPublish = document.createElement("li");
        newLIShowPadPublish.innerHTML = "<a href='#' id='publishToShowPad' onclick='pushToShowPad();'>Publish</a>";
        document.getElementsByClassName("tabs primary")[0].appendChild(newLIShowPadPublish);
    
    <?php
        }
    ?>
}
else if ((document.getElementsByClassName("tabs primary").length === 1) && (window.location.href.indexOf("/user/") > -1)) {
    var newLIPerm = document.createElement("li");
    newLIPerm.innerHTML = "<a href='#' onclick='displayUserPermissions()'>Permissions</a>";
    document.getElementsByClassName("tabs primary")[0].appendChild(newLIPerm);
}
    
<?php
if (strpos($_SERVER["REQUEST_URI"],'/manage-content') === 0) { 
?>
for (var i = 0; i < document.getElementsByClassName("views-field-title").length; i++ ) {
    var myself = document.getElementsByClassName("views-field-title")[i];
    if ((myself.childNodes[1].href !== undefined) && (myself.childNodes[1].href.indexOf("/node/") > -1)) {
        var newBtn = document.createElement("img");
        newBtn.setAttribute("src","/sites/default/files/images/preview.png");
        newBtn.setAttribute("style","float:right;padding-top:-10px;cursor:pointer;");
        var onClickAction = "previewContent('" + getNode(myself.childNodes[1].href) + "','" + myself.childNodes[1].innerText + "');";
        newBtn.setAttribute("onclick",onClickAction);
        myself.insertBefore(newBtn,myself.firstChild);
    }
}
<?php } ?>
    
function previewContent(node,contentTitle) {
    document.getElementById("previewFrame").src = "";
    document.getElementById("previewFrameTitle").innerText = contentTitle;
    document.getElementById("previewFrame").src = "https://" + window.location.hostname + "/h5p/embed/" + node.toString();
    document.getElementById("previewWindow").style.display="block";
}
    
function pushToShowPad() {
    <?php
        $node = menu_get_object();
        $briefDescription = '';
        $tagId = '';
        $contentTitle = '';
        $nodeId = '';
        $revisionId = 0;
        if ( !empty($node) ) {
            $nodeId = $node->nid;
            $revisionId = $node->vid;
            $contentTitle = $node->title;
            $briefDescription = db_query('SELECT field_brief_description_value FROM field_data_field_brief_description WHERE entity_id = :nid', array(':nid' => $node->nid))->fetchField();
            $tagId = db_query('SELECT FDFSU.field_showpad_url_value FROM taxonomy_index TI INNER JOIN taxonomy_term_data TTD on TTD.tid = TI.tid INNER JOIN field_data_field_showpad_url FDFSU on FDFSU.entity_id = TTD.tid WHERE TI.nid = :nid', array(':nid' => $node->nid))->fetchField();
        }

        echo "var briefDesc = '" . str_replace("'", "&quot;",$briefDescription) . "';";
        echo "var tagId = '" . $tagId . "';";
        echo "var contentTitle = '" . str_replace("'", "&quot;",$contentTitle) . "';";
        echo "var nodeId = '" . $revisionId . "';";
    ?>
    
    var contentInfo = { 
        tvsNode: nodeId,
        tvsTitle: contentTitle,
        tvsDesc: briefDesc,
        tvsTag: tagId,
        tvsUrl: window.location.href
    }

    var showPadPublish = "/sites/all/libraries/tvs/post_to_showpad.php";

    H5P.jQuery.ajax({ 
        type: "POST",
        data: contentInfo,
        dataType: "json",
        url: showPadPublish,
        success: function(data){
            
            },
        error: function(data) {

            }
        });

    alert("Content published to ShowPad");
}
    
function getNode(src) {
    if (src === undefined) { src = window.location.href;}
   if (src.indexOf("node") > -1) {
          var nodeIdPost = src.lastIndexOf("/");
          var nodeId = src.substring(nodeIdPost+1).replace("#","");
          if (isNaN(nodeId)) {
              return 0;
          }
          else {
              return nodeId;
          }
   }
   return 0;
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
    
function getReportUrl () {
    var currentNodeId = getNode();
   if ((currentNodeId === 0) || (isNaN(currentNodeId))) {
       return "/viewing-report";

   }
  else {
       return "/viewing-report?cid=" + currentNodeId;
  }
}   
    
function displayUserPermissions() {
    alert("Coming soon...");
}

function displayEmbedDialog() {
    var embedCode = '<iframe allowfullscreen="allowfullscreen" height="100%" id="previewFrame"';
    embedCode += 'src="https://' + window.location.host.toLowerCase() + '/h5p/embed/';
    embedCode += getNode() + '" width="100%">'
    prompt("Copy this embed code",embedCode);
}
    
function downloadContent() {
    <?php
        $node = menu_get_object();
        $revisionId = 0;
        $nodeId = '';
        if ( !empty($node) ) {
            $revisionId = $node->vid;
        }

        echo "var revisionId = '" . $revisionId . "';";
    ?>

    var downloadPackage = "/sites/all/libraries/tvs/downloadPackage.php?cid=" + revisionId;
    window.open(downloadPackage);
}
 
jQuery(document).ready(function($){
    $(".manage_permission").click(function(){
        $(".display_permission").toggle();       
    });
}); 
</script>