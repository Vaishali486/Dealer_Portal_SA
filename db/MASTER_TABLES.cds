namespace DEALER_PORTAL;
using { cuid } from '@sap/cds/common';

entity RESOURCE_APPLICATION_MASTER: cuid{
            @readonly SEQUENCE : Integer64;
            RESOURCE_NAME : String(100);
            RESOURCE_TYPE : String(10);
            LOGO : String(200) @UI.IsImageURL: true;
            @Core.MediaType : FILE_MIMETYPE @Core.ContentDisposition.Filename : FILE_NAME @Core.ContentDisposition.Type : 'inline'
            FILE_CONTENT: LargeBinary;
            FILE_NAME : String(200);
            @Core.IsMediaType
            FILE_MIMETYPE : String(200);
            TO_RESOURCE_TYPE : Association to one MASTER_RESOURCE_TYPE on 
                                TO_RESOURCE_TYPE.RESOURCE_TYPE = RESOURCE_TYPE;

        }
        entity MASTER_RESOURCE_TYPE{
            key RESOURCE_TYPE : String(10);
            RESOURCE_TYPE_DESC : String(50);
        }

        entity APPLICATION_MASTER : cuid{ 
            @readonly SR_NO:Integer64;
            APPLICATION_ICON: String(100) @UI.IsImageURL: true;
            APPLICATION_ICON_URL: String(100) ;
            APPLICATION_TYPE: String(10);
            APPLICATION_NAME: String(200);
            USER_ROLE: String(100);
            TO_APPLICATION_TYPE : Association to one MASTER_APPLICATION_TYPE on
                                    TO_APPLICATION_TYPE.APPLICATION_TYPE = APPLICATION_TYPE;
            TO_SA_APPLICATION: Composition of many SA_APPLICATION_MASTER on 
                                    TO_SA_APPLICATION.TO_APPLICATION = $self; 

        }
        entity SA_APPLICATION_MASTER : cuid{
            SA_APPLICATION_ICON: String(100) @UI.IsImageURL: true;
            SA_APPLICATION_ICON_URL: String(100);
            SA_APPLICATION_LINK: String(10);
            SA_APPLICATION_NAME: String(200);
            TO_APPLICATION : Association  to APPLICATION_MASTER;
            
        }
        entity MASTER_APPLICATION_TYPE{
            key APPLICATION_TYPE : String(10);
            APPLICATION_TYPE_DESC :String(50);

        }
        entity MASTER_ROLE_COLLECTION {
            key USER_ROLE: String(100);
            USER_ROLE_DESCRIPTION : String(200);
            ISREADONLY : Boolean;
        }
        
    