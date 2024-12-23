using { DEALER_PORTAL } from '../db/MASTER_TABLES';

service  ideal_sa_application{
    @odata.draft.enabled
    entity resourceApplicationMaster as projection on DEALER_PORTAL.RESOURCE_APPLICATION_MASTER;
    @odata.draft.enabled
    entity applicationMaster as projection on DEALER_PORTAL.APPLICATION_MASTER;
    entity saApplicationMaster as projection on DEALER_PORTAL.SA_APPLICATION_MASTER;
    entity masterRoleCollection as projection on DEALER_PORTAL.MASTER_ROLE_COLLECTION;

    entity masterResource as projection on DEALER_PORTAL.MASTER_RESOURCE_TYPE;
    entity masterApplicationType as projection on DEALER_PORTAL.MASTER_APPLICATION_TYPE;

}
