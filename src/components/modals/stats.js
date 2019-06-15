import React from "react";

export default props=>{
    return (
        <div className="modal fade" id="statsmodal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">This is the "your stats" modal</h5>
                        <button type="button" className="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


