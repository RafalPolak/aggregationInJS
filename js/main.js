console.log('test: ',json);

//asset,country,supplier,componentIdentifier,componentService,lastHour,lastSixHours,today,uniqueRequestId

function Log(logId, country, asset, supplier, componentIdentifier, componentService, lastHour, lastSixHour, today, arrayOfLogs){
    this.logId = logId;
    this.country = country;
    this.asset = asset;
    this.supplier = supplier;
    this.componentIdentifier = componentIdentifier;
    this.componentService = componentService;
    this.lastHour = lastHour;
    this.lastSixHours = lastSixHour;
    this.today = today;
    this.arrayOfLogs = arrayOfLogs;
    this.addLogToArray = function(log){
        this.arrayOfLogs.push(log);
    }
    this.addSuccessLastHour = function(amount){
        this.lastHour.countOfSuccess += amount;
    }
    this.addWarningLastHour = function(amount){
        this.lastHour.countOfWarning += amount;
    }
    this.addFailureLastHour = function(amount){
        this.lastHour.countOfFailure += amount;
    }
    this.addSuccessLastSixHour = function(amount){
        this.lastSixHours.countOfSuccess += amount;
    }
    this.addWarningLastSixHour = function(amount){
        this.lastSixHours.countOfWarning += amount;
    }
    this.addFailureLastSixHour = function(amount){
        this.lastSixHours.countOfFailure += amount;
    }
    this.addSuccessToday = function(amount){
        this.today.countOfSuccess += amount;
    }
    this.addWarningToday = function(amount){
        this.today.countOfWarning += amount;
    }
    this.addFailureToday = function(amount){
        this.today.countOfFailure += amount;
    }
}


    // countOfSuccess:0,
    // countOfWarning:2,
    // countOfFailure:1

var logs = json;

var aggregatedData = [];

for(var arrayIndex=0;arrayIndex<logs.length;arrayIndex++){
    var logId = arrayIndex;

    if(logs[arrayIndex]!=undefined){


        var lastHour = {
                countOfSuccess:0,
                countOfWarning:0,
                countOfFailure:0
        };

        var lastSixHours = {
                countOfSuccess:0,
                countOfWarning:0,
                countOfFailure:0
        };

        var today = {
                countOfSuccess:0,
                countOfWarning:0,
                countOfFailure:0
        };



        var log = new Log(logId,logs[arrayIndex].country,logs[arrayIndex].asset,
                            logs[arrayIndex].supplier, logs[arrayIndex].componentIdentifier, logs[arrayIndex].componentService,
                            lastHour, lastSixHours, today, []);

        for(var innerIndex=0;innerIndex<logs.length;innerIndex++) {
            if(logs[innerIndex]!=undefined){
                if (logs[innerIndex].country === log.country &&
                    logs[innerIndex].asset === log.asset &&
                    logs[innerIndex].supplier === log.supplier &&
                    logs[innerIndex].componentIdentifier === log.componentIdentifier &&
                    logs[innerIndex].componentService === log.componentService) {

                    log.addSuccessLastHour(logs[innerIndex].lastHour.countOfSuccess);
                    log.addWarningLastHour(logs[innerIndex].lastHour.countOfWarning);
                    log.addFailureLastHour(logs[innerIndex].lastHour.countOfFailure);

                    log.addSuccessLastSixHour(logs[innerIndex].lastSixHours.countOfSuccess);
                    log.addWarningLastSixHour(logs[innerIndex].lastSixHours.countOfWarning);
                    log.addFailureLastSixHour(logs[innerIndex].lastSixHours.countOfFailure);

                    log.addSuccessToday(logs[innerIndex].today.countOfSuccess);
                    log.addWarningToday(logs[innerIndex].today.countOfWarning);
                    log.addFailureToday(logs[innerIndex].today.countOfFailure);

                    log.addLogToArray(logs[innerIndex]);

                    delete logs[innerIndex];
                }
            }
        }
        aggregatedData.push(log);
    }
}

console.log('aggregated: ',aggregatedData);
