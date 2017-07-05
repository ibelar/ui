<?php

namespace atk4\ui;

/**
 * This class generates action, that will be able to loop-back to the callback method.
 */
class jsModal extends jsExpression
{
	public $modal_default = ['duration'=>100, 'allowMultiple'=>true];
    public function __construct($title, $url, $args = [], $mode = 'json', $modal_options=[])
    {
	    $modal_options = array_merge($this->modal_default, $modal_options);
        if ($url instanceof VirtualPage) {
            $url = $url->getURL('cut');
        }

        parent::__construct('$(this).createModal([arg])', ['arg'=>['uri'=>$url, 'title'=>$title, 'mode'=>$mode, 'uri_options'=>$args, 'modal_options'=>$modal_options]]);
    }
}
