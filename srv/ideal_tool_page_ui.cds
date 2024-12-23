using { ideal_sa_application } from './ideal_tool_page';


annotate ideal_sa_application.applicationMaster @(
    Common : {
    SideEffects #ChangeApplicationIcon : {
        SourceProperties : [APPLICATION_ICON_URL],
        TargetProperties   : [APPLICATION_ICON]
    }
});

annotate ideal_sa_application.saApplicationMaster @(
    Common : {
    SideEffects #ChangeSAApplicationIcon : {
        SourceProperties : [SA_APPLICATION_ICON_URL],
        TargetProperties   : [SA_APPLICATION_ICON]
    }
});