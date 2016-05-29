var url = "http://samples.galenframework.com/tutorial1/tutorial1.html";
var browser = "firefox";

this.devices = {
    mobile: {
        name: "mobile",
        tags: ["mobile"],
        size: "640x960"
    },
    tablet: {
        name: "tablet",
        tags: ["tablet"],
        size: "1024x768"
    },
    desktop: {
        name: "dektop",
        tags: ["desktop"],
        size: "1280x1024"
    }
};

function run(specFile) {
    forAll(devices, function(device) {
        test("Example test on ${name} device", function() {
            var driver = createDriver(url, device.size, browser);
            checkLayout(driver, specFile, device.tags);
            driver.quit();
        });
    });
}

(function(export) {
    export.run = run;
})(this);
