import React from "react";

const Modal = () => {
  return (
    <>
      <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Data Warning</h5>
              <button
                type="button"
                class="btn-close"
                data-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p>
                Warning: This application is currently using Local Storage for
                user preferences and vocabulary progress. To avoid loss of data,
                do not clear your browser's cache or stored data.
              </p>
              <p>
                Later versions of the application will host data in a stable
                database.
              </p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
