import atkPlugin from 'plugins/atkPlugin';
import modalService from 'services/modalService';

export default class createModal extends atkPlugin {

  constructor(element, options) {
    super(element, options)
    this.id = modalService.modals.length;
    this.service = modalService;
    //this.modalService = modalService;
  }

  static getService() {
      return modalService;
  }

  main() {
      const modal = this;
      const options = modal.settings;

      //const modalId = this.modalId;
      // make sure we have an object when no option is passed
      if ($.isArray(options.uri_options)) {
          options.uri_options = {};
      }
      let $m = $('<div class="atk-modal ui modal scrolling"/>').attr('id', 'atk-modal-'+modal.id).appendTo('body').html(this.getDialogHtml(options.title));
      //let $m = $container.find('.modal');
      modal.service.addModal($m);
      const test= $.extend({},typeof options.modal_options === 'object' && options.modal_options);


      $('.atk-modal.modal').modal($.extend({
          onHide: function (el) {
              return true;
          },
          onHidden: function () {
              const modal = $(this);
              const service = createModal.getService();
              service.removeModal(modal);
              modal.remove();
          },
          onVisible: function () {
              let $content = $m.find('.atk-dialog-content');
              if (options.mode === 'json') {
                  $.getJSON(options.uri, $.extend(options.uri_options, {json:true}), function (resp) {
                      $content.html(resp.html);
                      const result = function(){ eval(resp.eval.replace(/<\/?script>/g, '')); }.call(this.obj);
                      //$m.modal('refresh');
                      modal.service.refreshModal(modal.id);
                  }).fail(function(){
                      console.log('Error loading modal content.')
                  });
              } else {
                  $content
                      .load($.addParams(options.uri, options.uri_options), function() {
                          $m.modal("refresh");
                      });
              }
              //modal.service.addModal($m);
          }}, options.modal_options)).modal('show');
      //Attach closing handler
      // $m.on('close', '.atk-dialog-content', function (event) {
      //     $m.modal('hide');
      //
      // });
      //this.onAddModal($m);
  }

  onAddModal(modal) {
    modalService.addModal(modal);
  }

  onRemoveModal() {

  }

  getDialogHtml(title) {
    return `<i class="close icon"></i>
          <div class="header">${title}</div>
          <div class="image content atk-dialog-content">
            <div class="ui active inverted dimmer">
              <div class="ui text loader">Loading</div>
            </div>
          </div>`;
  }
}

createModal.DEFAULTS = {
  uri: null,
  title: '',
  uri_options: {},
  modal_options: {}
};
