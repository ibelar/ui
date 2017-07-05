/**
 * Singleton class
 * Keep track of how many modal are use by the app.
 */
class modalService {

    static getInstance() {
        return this;
    }

    constructor() {
        if(!modalService.instance){
            this.modals = [];
            modalService.instance = this;
        }
        return modalService.instance;
    }

    addModal(modal) {
        //modal.on('close', '.atk-dialog-content', this.onCloseTrigger);
        // if(this.modals.length > 0) {
        //     this.modals[this.modals.length - 1].find('i.close.icon').hide();
        // }
        //modal./*css('z-index', 1000 + this.modals.length).*/attr('id','#atk-modal-'+this.modals.length);

        //const z =  modal.css('z-index');
        modal.modal('refresh');
        this.modals.push(modal);
    }

    onCloseTrigger(event) {
        const service = modalService.instance;
        service.modals[service.modals.length-1].modal('hide');
        event.preventDefault();
        event.stopImmediatePropagation();
    }

    refreshModal(id) {
        const modal = this.modals[id].data('moduleModal');
        const num   = this.modals.length;
        modal.refresh();


        // this.modals.forEach(function(m, i){
        //    if(i === num) {
        //        m.modal('refresh')
        //    } else {
        //        const module = m.data('moduleModal');
        //        m.data('moduleModal').setting('context','#atk-modal-'+i);
        //    }
        // });
    }

    removeModal(modal) {
        this.modals.pop();
        if(this.modals.length > 0) {
            this.modals[this.modals.length - 1].find('i.close.icon').show();
        }
    }
}

const instance = new modalService();
Object.freeze(instance);

export default instance;