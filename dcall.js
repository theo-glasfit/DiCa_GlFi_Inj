Doc = {
    Elements: {
        NoteBox: document.getElementById("NewNote"),
        NoteMenu: document.getElementById("NoteMenuList"),
        CommsBox: document.getElementById("NewSMSNote"),
        CommMenu: document.getElementById("CommMenuList"),
        Hamburger: document.getElementById("jshamburger"),
        HamburgerMenu: document.getElementById("burgermenuJS"),
        HamburgerContainer: document.getElementById("JSburgerM"),
        MenuContainer: document.getElementById("MenuContainer"),
        NoteGrid: [document.querySelector("#NoteGrid")],
        NoteTab: document.querySelector("#NoteGrid"),
        WhatsappField: document.getElementById("JSWhatsapp"),
        WhatsappLink: document.getElementById("WhatsappLink"),
        ItemsGrid: document.querySelectorAll('.CellNoLines'),
        AuthMailInquiry: document.getElementById("JSAuthInquiry"),
        AuthMailLink: document.getElementById("EmailAuthLink"),
        InquiryMailField: document.getElementById("JSMailInquiry"),
        InquiryMailLink: document.getElementById("EmailInquiryLink"),
        NoteWin: document.getElementById("NoteWin"),
        PrintClaimLink: document.getElementById("CLaimLink"),
        SMSWin: document.getElementById("SmsWin"),
        PrintClaimReport: document.getElementById("ReportLink")
    },
    Client: {
        Cell: document.getElementById("ClientCell").value,
        Name: document.getElementById("ClientName").value,
        Surname: document.getElementById("ClientSurname").value
    },
    Claim: {
        REF: window.location.pathname.replace('/DPSWeb2/Branch/Claims/Edit/', ''),
        Type: document.getElementById("GlassType").value,
        Policy: document.getElementById("PolicyNumber").value
    },
    Telematix: {
        FieldJS: document.getElementById('TelematiXJS'),
        HelperBtn: document.getElementById('qrHelperBtn'),
        QRFormModal: document.getElementById('qrFormModal'),
        QRSubmitBtn: document.getElementById('submitQRs'),
        QRFieldA: document.getElementById('qr1'),
        QRFieldB: document.getElementById('qr2'),
        QRFieldC: document.getElementById('qr3')
    },
    Vehicle: {
        VIN: document.getElementById("VIN").value,
        Make: document.getElementById("VehicleMakeId-input").value,
        Model: document.getElementById("VehicleModelId-input").value,
        YModel: document.getElementById("txtVehicleManufacYear").value,
        WorkDescription: GetWorkDescription(document.getElementById("WorkDescription").value),
        Reg: document.getElementById("VehicleReg").value
    },
    JSMenu: {
        Status: document.getElementById('Status'),
        jsbtn: document.getElementById('JSStateChange')
    },
    User: document.querySelector('HEADER > div:nth-of-type(3)').innerHTML.split('\n')[2],
    URL: window.location.origin + window.location.pathname
};

// Event listener: Right click on notes.
Doc.Elements.NoteBox.addEventListener("contextmenu", (e) => {
    e.preventDefault(); 
    if (window.document.getSelection().toString() !== "") {
        window.JSSelect = window.document.getSelection().toString();
    }
    ShowCustomMenu("Note")
});

// Event listener: Right click on comms.
Doc.Elements.CommsBox.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    if (window.document.getSelection().toString() !== "") {
        window.JSSelect = window.document.getSelection().toString();
    }
    ShowCustomMenu("Comm")
});

// Event listener: Hide custom menu when loosing focus.
document.addEventListener("click", (e) => {
    HideCustomMenu();
    if (Doc.Elements.Hamburger.classList.contains("active")) {
        if (notContains(e.target.classList, "JSBMO")) {
            ToggleHamburger(_AuthEmailAddress);
        }
        
        function notContains(List, Word) {
            if (List.contains(Word)) {
                return false;
            } else {
                return true;
            }
        }
    }
});

// Declare: Get work descryption.
function GetWorkDescription(str) {
    let Result = "";
    let mapObj = {
        RFQ: 'Right Front Quarter', RFV: 'Right Front Vent', RFD: 'Right Front Door', RRD: 'Rear Right Door',
        RRV: 'Rear Right Vent', RRQ: 'Rear Right Quarter', WS: 'Windscreen', RG: 'Sunroof', RL: 'Rearlight',
        LFQ: 'Left Front Quarter', LFV: 'Left Front Vent', LFD: 'Left Front Door', LRD: 'Left Rear Door',
        LRV: 'Left Rear Vent', LRQ: 'Left Rear Quarter', RP: '', X: '', MLD: '', TINT: ''
    };
    const matches = str.match(/(RFQ|RFV|RFD|RRD|RRV|RRQ|WS|RG|RL|LFQ|LFV|LFD|LRD|LRV|LRQ|RP|X|MLD|TINT)/gi);
    if (matches) {
        Result = matches.map(match => mapObj[match.toUpperCase()]).join(', ');
    }
    Result = Result.replace(/\.|,/g, "");
    return Result;
};

// Declare: Display custom right click menu.
function ShowCustomMenu(Trigger) {
    if (Trigger == "Note") {
        Doc.Elements.CommMenu.style.display = "none";
        Doc.Elements.NoteMenu.style.display = "block";
        Doc.Elements.MenuContainer.style.display = "flex";
        Doc.Elements.MenuContainer.style.left = event.pageX + "px";
        Doc.Elements.MenuContainer.style.top = event.pageY + "px";
    } else if (Trigger == "Comm") {
        Doc.Elements.NoteMenu.style.display = "none";
        Doc.Elements.CommMenu.style.display = "block";
        Doc.Elements.MenuContainer.style.display = "flex";
        Doc.Elements.MenuContainer.style.left = event.pageX + "px";
        Doc.Elements.MenuContainer.style.top = event.pageY + "px";
    }
};

// Declare: Hide custom menu.
function HideCustomMenu() {
    if (Doc.Elements.MenuContainer.style.display != "none") {
        Doc.Elements.MenuContainer.style.display = "none";
    }
};

// Declare: Colourize notes.
function ProcessNotes() {
    let result,
        curr;
    let NotesTab = Doc.Elements.NoteTab.parentNode;
    let MSG = "Loading";
    NotesTab.id = 'dnote';
    var PNotes = setInterval(function(){
        let SPage = false;
        let SSPage = null;
        let SNotes = false;
        let SProcessed = false;
        if(NotesTab.querySelector(".t-icon") == null){
            var LoadingNotesPage = setInterval(function(){
                if(NotesTab.querySelector(".t-icon") !== null){
                    SPage = true;
                    SSPage = NotesTab.querySelector(".t-icon");
                    clearInterval(LoadingNotesPage);
            }}, 300);
        } else {
            SPage = true;
            SSPage = NotesTab.querySelector(".t-icon");
        }
        if (SSPage !== null) {
            if(SSPage.classList.contains("t-loading")) {
                var LoadingNotes = setInterval(function(){
                    if(SSPage.classList.contains("t-loading") == false){
                        SNotes = true;
                        clearInterval(LoadingNotes);
                }}, 500);
            } else {
                SNotes = true;
        }};
        if((SPage == true) && (SNotes == true)) {
            SProcessed = true;
        };
        if(SProcessed == true){
            while (curr = Doc.Elements.NoteGrid.pop()) {
                if (!curr.textContent.match("Branch")) continue;
                for (var i = 0; i < curr.childNodes.length; ++i) {
                    switch (curr.childNodes[i].nodeType) {
                        case Node.TEXT_NODE:
                            if (curr.childNodes[i].textContent.match("Branch")) {
                                if (curr.innerHTML.includes("(Branch)")) {
                                    result = curr.parentNode;
                                    result.id = 'bnote';
                            }};
                            if (curr.childNodes[i].textContent.match(Doc.User)) {
                                if (curr.innerHTML.includes(Doc.User)) {
                                    result = curr.parentNode;
                                    result.id = 'rnote';
                            }};
                            break;
                        case Node.ELEMENT_NODE:
                            Doc.Elements.NoteGrid.push(curr.childNodes[i]);
                            break;
            }}};
            clearInterval(PNotes);
            MSG = "Processed";
    }}, 3000);
};

// Declare: Build Whatsapp link.
function ProcessWhatsapp() {
    if (Doc.Elements.WhatsappField.style.display == "none") {
        if (Doc.Client.Cell !== "") {
            Doc.Elements.WhatsappLink.href = "https://web.whatsapp.com/send/?phone=27" + Doc.Client.Cell.substr(1);
            Doc.Elements.WhatsappField.style = "display: block; background-color: rgb(217 217 217)";
}}};

// Declare: Build auth mail link.
function ProcessAuthMail(_AuthMailAddress) {
    let Count = 0;
    Array.from(Doc.Elements.ItemsGrid).forEach(function (pcf) {
        if ((pcf.innerHTML == "FY20000") || (pcf.innerHTML == "FY1000000 ") || (pcf.innerHTML == "FY2000000")) {
            Count = 1;
    }});
    if (Count == 1) {
        Doc.Elements.AuthMailInquiry.style = "display: block; background-color: rgb(217 217 217)";
        Doc.Elements.AuthMailLink.href = "mailto:" + _AuthMailAddress + "?Subject=REF%20" + Doc.Claim.REF + "&Body=Good%20day.%0AI%20hope%20you%20are%20well.%0A%0APlease%20find%20attached%20a%20FY%20quotation%20for%20pricing%20and%20authorisation.%0AThe%20quotation%20is%20also%20uploaded%20on%20the%20claim%20comms%20for%20your%20reference.";
    } else if (Count == 0) {
        Doc.Elements.AuthMailInquiry.style = "display: none";
        Doc.Elements.AuthMailLink.href = "#";
}};

// Declare: Build buyouts email.
function ProcessInquiryMail() {
    if ((Doc.Vehicle.VIN !== "") && (Doc.Vehicle.Make !== "")) {
        Doc.Elements.InquiryMailField.style = "display: block; background-color: rgb(217 217 217)";
        Doc.Elements.InquiryMailLink.href = GetBuyoutsLink(_BuyOutsAddress);
transformString(string)
}};

// Declare: Copy text to memory.
function JScopyText(JSSelect) {
    navigator.clipboard.writeText(window.JSSelect).then(() => {
        delete window.JSSelect;
    }).catch((e) => {
        console.log(e);
    });
};

// Declare: Paste copied text.
function JSPasteText() {
    let myField;
    if (Doc.Elements.NoteWin.style.display !== "none") {
        myField = Doc.Elements.NoteBox;
    } else if (Doc.Elements.SMSWin.style.display !== "none") {
        myField = Doc.Elements.CommsBox;
    }
    if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;

        navigator.clipboard.readText().then((clipText) => (
            myField.value = myField.value.substring(0, startPos) + clipText + myField.value.substring(endPos, myField.value.length)
        ))
    } else {
        navigator.clipboard.readText().then((clipText) => (
            myField.value += clipText
))}};

// Call: Change Button Visibility depending on claim status.
if (Doc.JSMenu.Status.value == "Invalid") {
    Doc.JSMenu.jsbtn.style.display = "block";
};

// Declare: Enable button to change status.
function JSChangeState() {
    Doc.JSMenu.Status.value = "New";
    alert("Status changed to new.\nSave to apply the new status.");
};

// Declare: LoadJsQR Javascript
function loadJsQR(callback) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js';
    script.onload = callback;
    document.head.appendChild(script);
};

// Declare: Process Telematix
function ProcessTelematix(_ContactNo) {
    Doc.Telematix.FieldJS.style.display = "block";
    loadJsQR(() => {
        Doc.Telematix.HelperBtn.onclick = () => {
            Doc.Telematix.QRFormModal.style.display = 'block';
        };
        Doc.Telematix.QRSubmitBtn.onclick = async () => {
            Doc.Telematix.QRFormModal.style.display = 'none';
            const getTextFromQR = async (fileInput) => {
                return new Promise((resolve) => {
                    const file = fileInput.files[0];
                    if (!file) return resolve("");
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const img = new Image();
                        img.onload = () => {
                            const canvas = document.createElement('canvas');
                            canvas.width = img.width;
                            canvas.height = img.height;
                            const ctx = canvas.getContext('2d');
                            ctx.drawImage(img, 0, 0);
                            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                            const qrCode = jsQR(imageData.data, canvas.width, canvas.height);
                            resolve(qrCode ? qrCode.data : "[Invalid QR]");
                        };
                        img.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
            })};
            const qr1 = await getTextFromQR(Doc.Telematix.QRFieldA);
            const qr2 = await getTextFromQR(Doc.Telematix.QRFieldB);
            const qr3 = await getTextFromQR(Doc.Telematix.QRFieldC);
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const yyyy = today.getFullYear();
            const nowDate = mm + '/' + dd + '/' + yyyy;
            const message = encodeURIComponent(
                `Branch: ` + _Branch + `\n` +
                `Vehicle Make: ${Doc.Vehicle.Make}\n` +
                `Vehicle Model: ${Doc.Vehicle.Model}\n` +
                `Vehicle Year: ${Doc.Vehicle.YModel}\n` +
                `Vehicle Reg: ${Doc.Vehicle.Reg}\n` +
                `Vehicle VIN: ${Doc.Vehicle.VIN}\n` +
                `Policy No: ${Doc.Claim.Policy}\n` +
                `Client Name: ${Doc.Client.Name}\n` +
                `Client Surname: ${Doc.Client.Surname}\n` +
                `Installation Date: ${nowDate}\n` +
                `SN: ${qr1}\n` +
                `IMEI: ${qr2}\n` +
                `PANIC: ${qr3}`
            );
            const phoneNumber = _ContactNo;
            const waURL = `https://web.whatsapp.com/send/?phone=27${phoneNumber}&text=${message}`;
            window.open(waURL, '_blank');
    }});
};

// Call: Telematix devices.
if (Doc.Claim.Type == "Unit") {
    ProcessTelematix(_Telematic_Contact);
};

// Declare: Toggle hamburger menu.
function ToggleHamburger(_AuthEmail) {
    Doc.Elements.Hamburger.classList.toggle("active");
    Doc.Elements.HamburgerMenu.classList.toggle("active");

    if (Doc.Elements.Hamburger.classList.contains("active")) {
        ProcessWhatsapp();
        Doc.Elements.PrintClaimLink.href = Doc.URL.replace("Branch/Claims/Edit", "Report/_claim") + "?reporttype=claim";
        Doc.Elements.PrintClaimReport.href = Doc.URL.replace("Branch/Claims/Edit", "Report/_claim") + "?reporttype=worksorder";
        ProcessAuthMail(_AuthEmail);
        ProcessInquiryMail();
    }
};

// Declare: Build buyouts link.
function GetBuyoutsLink(_BuyOuts) {
    let Address = "";
    let CC = _BuyOuts;
    let Subject = "REF " + Doc.Claim.REF;
    let Body = "Good day.\n\nI hope you are well.\nPlease quote me on glass for the following positions: " + Doc.Vehicle.WorkDescription + "\nIt is for a " + Doc.Vehicle.Make + ' with VIN: ' + Doc.Vehicle.VIN + "\n\nThanx in advance.";
    let Result = "";
    
    Address = emails[Doc.Vehicle.Make];
    Address = transformString(Address);
    if (Address == CC) {
        Result = "mailto:" + Address + "?Subject=" + encodeURI(Subject) + "&Body=" + encodeURI(Body);
    } else {
        Result = "mailto:" + Address + "?cc=" + CC + "&Subject=" + encodeURI(Subject) + "&Body=" + encodeURI(Body);
    }
    return Result;
};

// Declare: Custom menu messages.
function GetComms(Top, Bottom) {
    Doc.Elements.CommsBox.value += _COMMSMsg[Top][Bottom];
};

// Declare: ustom messages in right click.
function GetMSG(Top, Mid, Bottom) {
    Doc.Elements.NoteBox.value += MSG[Top][Mid][Bottom];
};

// Change the JS menu to be visible.
Doc.Elements.HamburgerContainer.style.display = "flex";
ProcessNotes();
