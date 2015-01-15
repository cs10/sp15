<?php

// Open the current directory...
if ($handle = opendir('.'))
{
    // ...start scanning through it.
    while (false !== ($file = readdir($handle)))
    {
        // Make sure we don't list this folder,file or their links.
        if ($file != "." && $file != ".." && $file != $this_script && !in_array($file, $ignore_list) && (substr($file, 0, 1) != '.'))
        {
            // Get file info.
            $info                  =    pathinfo($file);
            // Organize file info.
            $item['name']          =     $info['filename'];
            $item['lname']         =     strtolower($info['filename']);
            $item['bname']         =     $info['basename'];
            $item['lbname']        =     strtolower($info['basename']);
            if (isset($info['extension'])) {
                $item['ext'] = $info['extension'];
            } else {
                $item['ext']  = '.';
            }
            $item['lext'] = strtolower($info['extension']);

            else {
                $folder_icon   = 'glyphicon glyphicon-folder-close';
                $item['class'] = 'glyphicon glyphicon-file';
            }

            if ($table_options['size'] || $table_options['age'])
                $stat          =    stat($file); // ... slow, but faster than using filemtime() & filesize() instead.

            if ($table_options['size']) {
                $item['bytes'] =    $stat['size'];
                $item['size']  =    bytes_to_string($stat['size'], 2);
            }

            if ($table_options['age']) {
                $item['mtime'] =    $stat['mtime'];
                $item['iso_mtime']  =   gmdate("Y-m-d H:i:s", $item['mtime']);
            }

            // Add files to the file list...
            if(is_dir($info['basename'])){
                array_push($folder_list, $item);
            }
            // ...and folders to the folder list.
            else{
                array_push($file_list, $item);
            }
            // Clear stat() cache to free up memory (not really needed).
            clearstatcache();
            // Add this items file size to this folders total size
            $total_size += $item['bytes'];
        }
    }
    // Close the directory when finished.
    closedir($handle);
}

/**
 *    @ http://us3.php.net/manual/en/function.filesize.php#84652
 */
function bytes_to_string($size, $precision = 0) {
    $sizes = array('YB', 'ZB', 'EB', 'PB', 'TB', 'GB', 'MB', 'KB', 'bytes');
    $total = count($sizes);
    while($total-- && $size > 1024) $size /= 1024;
    $return['num'] = round($size, $precision);
    $return['str'] = $sizes[$total];
    return $return;
}





// Set breadcrumbs
foreach($dir_name as $dir => $name) :
    if(($name != ' ') && ($name != '') && ($name != '.') && ($name != '/')):
        $parent = '';
        for ($i = 1; $i <= $dir; $i++):
            $parent .= rawurlencode($dir_name[$i]) . '/';
        endfor;
        $breadcrumbs .= "      <li><a href=\"/$parent\">".utf8_encode($name)."</a></li>" ;
    endif;
endforeach;


// Set table body
if(($folder_list) || ($file_list) ) {
   $table_body = null;

    if($folder_list):
        foreach($folder_list as $item) :
            $table_body .= "          <tr>" ;
            $table_body .= "            <td";
            $table_body .= " data-sort-value=\"". htmlentities(utf8_encode($item['lbname']), ENT_QUOTES, 'utf-8') . "\"" ;
            $table_body .= ">";
            $table_body .= "<span class=\"$folder_icon\"></span>&nbsp;";
            $table_body .= "<a href=\"" . htmlentities(rawurlencode($item['bname']), ENT_QUOTES, 'utf-8') . "/\"><strong>" . $item['bname'] . "</strong></a></td>" ;

            if ($table_options['size']) {
                $table_body .= "            <td";
                $table_body .= " class=\"text-right\" data-sort-value=\"0\"";
                $table_body .= ">&mdash;</td>" ;
            }

            $table_body .= "          </tr>" ;

        endforeach;
    endif;

    if($file_list):
        foreach($file_list as $item) :
            $table_body .= "          <tr>" ;
            $table_body .= "            <td";
            $table_body .= " data-sort-value=\"". htmlentities(utf8_encode($item['lbname']), ENT_QUOTES, 'utf-8') . "\"" ;
            $table_body .= ">";
            $table_body .= "<span class=\"" . $item['class'] . "\"></span>&nbsp;";

            $display_name = $item['bname'];


            $table_body .= "<a href=\"" . htmlentities(rawurlencode($item['bname']), ENT_QUOTES, 'utf-8') . "\"$modal_class>" . htmlspecialchars($display_name) . "</a></td>" ;

            if ($table_options['size']) {
                $table_body .= "            <td";
                $table_body .= " class=\"text-right\" data-sort-value=\"" . $item['bytes'] . "\"";
                $table_body .= " title=\"" . $item['bytes'] . " " ._('bytes')."\"";
                $table_body .= ">" . $item['size']['num'] . " " . $item['size']['str'] . "</td>" ;
            }

            $table_body .= "          </tr>" ;
        endforeach;
    endif;
} else {
        $table_body .= "          <tr>" ;
        $table_body .= "            <td colspan=\"2\" style=\"font-style:italic\">";
        $table_body .= "<span class=\"" . $item['class'] . "\">&nbsp;</span>";
        $table_body .= "empty folder</td>" ;
        $table_body .= "          </tr>" ;
}

