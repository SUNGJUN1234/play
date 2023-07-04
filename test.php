<link rel="stylesheet" type="text/css" media="screen" href="<?=BO_SKIN_PATH?>/style.css?<?=time()?>" />
  <div class='board_wrap'>
    <? /* ?>
    <ul id='view_head'>
    <li>
      <img src='<?=BO_SKIN_PATH?>/img/ico_date.gif' alt='작성일'/>
      작성일 : <?=$datetime?> / 조회 : <?=$hit?>
    </li>
    <!-- li class='right'><?=$btn_sns?></li -->
    </ul>
    <? */ ?>
    <h1 id='view_title'><?=$subject?></h1>

    <div id='view_cont'>

    <div id='view_content'>
    	<div style="padding:20px 0;"><?=$content?></div>
      <?
      // 이미지 첨부파일 표시
      for($i=0;$i<count($file_img);$i++)
      {
        echo "<div style='text-align:center;'>".$file_img[$i]['view']."</div>";
      }
      ?>
      
    </div>

    <? if (count($file)) { ?>
    <div id='view_file'>
      <p id='view_filename'>
        <? for($i=0;$i<count($file);$i++) { ?>
        첨부파일 : <a href="<?=$file[$i]['href']?>"><?=$file[$i]['source']?></a> : <?=$file[$i]['size']?> M <br />
        <? } ?>
      </p>
    </div>
    <? } ?>


    <div id='view_comment'></div>
    </div>

    <ul class='buttons'>
    <li class='right'><?=$link_btns?></li>
    </ul>


  </div>


  <script type='text/javascript'>
  //<![CDATA[
  <? if ($is_comment): ?>
  var co_guest = '<?=!IS_MEMBER?>'
  , co_wr_no = '<?=$wr_no?>'
  , co_qstr = '<?=$qstr?>';
  <? endif; ?>

  <? if ($is_syntax): ?>
  $(function() { SyntaxHighlighter.all(); });
  <? endif; ?>


  $(window).load(function()
  {
  resizeBoardImage('<?=$img_width?>');
  //drawFont();
  });

  // HTML 로 넘어온 <img ... > 태그의 폭이 테이블폭보다 크다면 테이블폭을 적용한다.
  function resizeBoardImage(imageWidth, borderColor) {

    var target = document.getElementsByName('target_resize_image[]');
    var imageHeight = 0;

    if (target) {
        for(i=0; i<target.length; i++) {
            // 원래 사이즈를 저장해 놓는다
            target[i].tmp_width  = target[i].width;
            target[i].tmp_height = target[i].height;
            // 이미지 폭이 테이블 폭보다 크다면 테이블폭에 맞춘다
            if(target[i].width > imageWidth) {
                imageHeight = parseFloat(target[i].width / target[i].height)
                target[i].width = imageWidth;
                target[i].height = parseInt(imageWidth / imageHeight);
                target[i].style.cursor = 'pointer';

                // 스타일에 적용된 이미지의 폭과 높이를 삭제한다
                target[i].style.width = '';
                target[i].style.height = '';
            }

            if (borderColor) {
                target[i].style.borderWidth = '1px';
                target[i].style.borderStyle = 'solid';
                target[i].style.borderColor = borderColor;
            }
        }
    }
  }

  function getFontSize() {
    var fontSize = parseInt(get_cookie("ck_fontsize")); // 폰트크기 조절
    if (isNaN(fontSize)) { fontSize = 12; }
    return fontSize;
  }

  function scaleFont(val) {
    var fontSize = getFontSize();
    var fontSizeSave = fontSize;
    if (val > 0) {
        if (fontSize <= 18) {
            fontSize = fontSize + val;
        }
    } else {
        if (fontSize > 12) {
            fontSize = fontSize + val;
        }
    }
    if (fontSize != fontSizeSave) {
        drawFont(fontSize);
    }
    set_cookie("ck_fontsize", fontSize, 30, g4_cookie_domain);
  }

  function drawFont(fontSize) {
    if (!fontSize) {
        fontSize = getFontSize();
    }

    var subject=document.getElementById("writeSubject");
    var content=document.getElementById("writeContents");
    var comment=document.getElementById("commentContents");
    var wr_subject=document.getElementById("wr_subject");
    var wr_content=document.getElementById("wr_content");

    if (comment) {
        var commentDiv = comment.getElementsByTagName("div");
        var lineHeight = fontSize+Math.round(1.1*fontSize);
    }

    fontSize = fontSize + "px";

    if (subject)
        subject.style.fontSize=fontSize;
    if (content)
        content.style.fontSize=fontSize;
    if (wr_subject)
        wr_subject.style.fontSize=fontSize;
    if (wr_content)
        wr_content.style.fontSize=fontSize;
    if (commentDiv) {
        for (i=0;i<commentDiv.length;i++) {
            commentDiv[i].style.fontSize=fontSize;
        }
    }
  }


  //]]>
  </script>
