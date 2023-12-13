<?php
    // PRETTIFIED DUMP
    function var_dump_pre($mixed = null) {
        echo '<pre style="color: red; font-face:monospace; font-size:150%;">';
        var_dump($mixed);
        echo '</pre>';
        return null;
    }
?>
