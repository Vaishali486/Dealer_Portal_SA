const cds = require("@sap/cds")
module.exports = cds.service.impl(function (srv){
    const {masterRoleCollection,applicationMaster, saApplicationMaster,resourceApplicationMaster} = this.entities;
    // this.on('READ', masterRoleCollection, async (req) =>{
    //     try {
    //         await DELETE .from `DEALER_PORTAL_MASTER_ROLE_COLLECTION` ;
    //         const connRoleConfig = await cds.connect.to('ROLE_CONFIG');
    //         let allAppRoles = await connRoleConfig.send({
    //             method: 'GET',
    //             path: '/rolecollections',
    //             headers: { 'Content-Type': 'application/json',   
    //                 "accept": "application/json",
    //                 "X-Requested-With": "XMLHttpRequest"
    //             }
    //           })
    //         let i = 0, count =0; 
    //         for(i in allAppRoles){
    //             if(allAppRoles[i].name.includes('ZIDEAL'))
    //             {
    //                 await INSERT .into`DEALER_PORTAL_MASTER_ROLE_COLLECTION` 
    //                 .entries({USER_ROLE: allAppRoles[i].name, USER_ROLE_DESCRIPTION : allAppRoles[i].description, ISREADONLY: allAppRoles[i].isReadOnly })
    //                 count++;
    //             }
    //         }
    //         var data = await SELECT .from `DEALER_PORTAL_MASTER_ROLE_COLLECTION`
    //         return data;

    //     } catch (error) {
    //         var iErrorCode = error.code ?? 500;
    //         req.error({ code: iErrorCode, message: error.message ? error.message : error });
    //     }
    // });
    
    this.before('NEW',applicationMaster.drafts, async (req) =>{
        try {
            var qrySequence = await SELECT`MAX(SR_NO) as Sequence` .from`DEALER_PORTAL_APPLICATION_MASTER`;
            if(!qrySequence[0].Sequence){
                req.data.SR_NO = 1;
            }
            else {
                req.data.SR_NO = qrySequence[0].Sequence + 1;
            }

        } 
        catch (error) {
            let iErrorCode = error.code ?? 500;
            req.error({ code: iErrorCode, message: error.message ? error.message : error }); 
        }
    });

    this.before('NEW',resourceApplicationMaster.drafts, async (req) =>{
        try {
            var qrySequence = await SELECT`MAX(SEQUENCE) as Sequence` .from`DEALER_PORTAL_RESOURCE_APPLICATION_MASTER`;
            if(!qrySequence[0].Sequence){
                req.data.SEQUENCE = 1;
            }
            else {
                req.data.SEQUENCE = qrySequence[0].Sequence + 1;
            }

        } 
        catch (error) {
            let iErrorCode = error.code ?? 500;
            req.error({ code: iErrorCode, message: error.message ? error.message : error }); 
        }
    });

    this.before('CREATE',resourceApplicationMaster,async(req) =>{
        const path = srv.path
        req.data.LOGO = `${path}/resourceApplicationMaster(ID=${req.data.ID},IsActiveEntity=true)/FILE_CONTENT`;

        return path;

    });

    this.after('UPDATE',applicationMaster.drafts, async(req) =>{
        try {
            if(req.APPLICATION_ICON_URL){
                // return req.APPLICATION_ICON = req.APPLICATION_ICON_URL;
               var dataIcon = await UPDATE(applicationMaster.drafts) .set `APPLICATION_ICON = ${req.APPLICATION_ICON_URL}` .where `ID=${req.ID}`; 
               return dataIcon;  
            }
        } 
        catch (error) {
            let iErrorCode = error.code ?? 500;
            req.error({ code: iErrorCode, message: error.message ? error.message : error });
        }
    });
    this.after('UPDATE',saApplicationMaster.drafts, async(req) =>{
        try {
            if(req.SA_APPLICATION_ICON_URL){
                // return req.APPLICATION_ICON = req.APPLICATION_ICON_URL;
               var dataIcon = await UPDATE(saApplicationMaster.drafts) .set `SA_APPLICATION_ICON = ${req.SA_APPLICATION_ICON_URL}` .where `ID=${req.ID}`; 
               return dataIcon;  
            }
        } 
        catch (error) {
            let iErrorCode = error.code ?? 500;
            req.error({ code: iErrorCode, message: error.message ? error.message : error });
        }
    });
    this.before('SAVE', applicationMaster, async(req) =>{
        const {SR_NO,APPLICATION_ICON,APPLICATION_ICON_URL,APPLICATION_TYPE,APPLICATION_NAME,USER_ROLE,TO_SA_APPLICATION} =req.data;
        if(!APPLICATION_ICON_URL) req.error(400, `Please Enter Application Icon url`,"in/APPLICATION_ICON_URL");
        if(!APPLICATION_TYPE) req.error(400, `Please Enter Application Type`,"in/APPLICATION_TYPE");
        if(!APPLICATION_NAME) req.error(400, `Please Enter Application Name`,"in/APPLICATION_NAME");
        if(!USER_ROLE) req.error(400, `Please Select User Role`,"in/USER_ROLE");
        if(!TO_SA_APPLICATION) req.error(400, `Please Enter Sub Application Detail`,"in/TO_SA_APPLICATION");
        var aAppType = ['GRP','APP']
        if(aAppType.includes(APPLICATION_TYPE)){
            for(let i=0; i<TO_SA_APPLICATION.length;i++){
            const {ID,SA_APPLICATION_ICON_URL,SA_APPLICATION_LINK,SA_APPLICATION_NAME}= TO_SA_APPLICATION[i];
            if(!SA_APPLICATION_ICON_URL) req.error(400, `Please Enter Sub Application Icon url`, "in/TO_SA_APPLICATION/SA_APPLICATION_ICON_URL");
            if(!SA_APPLICATION_LINK) req.error(400, `Please Enter Sub Application Link`,"in/TO_SA_APPLICATION/SA_APPLICATION_LINK");
            if(!SA_APPLICATION_NAME) req.error(400, `Please Enter Sub Application Name`,"in/TO_SA_APPLICATION/SA_APPLICATION_NAME");
        }
        }
    })



})