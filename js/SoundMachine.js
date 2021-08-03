var track1Player = new Audio(),
    track2Player = new Audio(),
    track3Player = new Audio(),
    track4Player = new Audio();
var track1Index = 0,
    track2Index = 0,
    track3Index = 0,
    track4Index = 0


var audioObjectArray = [
    [],
    [],
    [],
    []
];

function SoundMachine() {
    this.Configuration = null;

    this.CurrentPageNumber = -1;
    this.MaximalPageNumber = -1;

    this.SamplePreviewPlayer = null;

    this.SelectedChipId = -1;
    this.SelectedSampleId = -1;
    this.SelectedSampleElement = null;

    this.SampleBlockSizes = new Array();

    this.IsPlaying = false;
    this.InitialLoop = false;
    this.PlayerPosition = 1;
    this.PlayerInterval = null;
    this.PlayingSamples = new Array();

    this.LoadOrReloadChips = function() {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            var response = request.responseText;

            if (response.length > 0) {
                SoundMachine.Configuration = JSON.parse(response);
            }
        };
        request.open("GET", "configuration.json", false);
        request.send();
    };

    this.GetChipInfo = function(chipId) {
        for (var i in SoundMachine.Configuration.chips) {
            var chip = SoundMachine.Configuration.chips[i];

            if (chip.id == chipId) {
                return chip;
            }
        }

        return null;
    };

    this.GetUnEquippedChips = function() {
        var equippedChips = new Array();
        var unequippedChips = new Array();

        var placeholders = document.querySelectorAll(".chips-equipped-placeholder");

        for (var i = 0; i < placeholders.length; i++) {
            var placeholder = placeholders[i];

            if (placeholder.getAttribute('data-equipped-chip-id') != -1) {
                equippedChips[equippedChips.length] = (placeholder.getAttribute('data-equipped-chip-id') * 1);
            }
        }

        for (var i in SoundMachine.Configuration.chips) {
            var chip = SoundMachine.Configuration.chips[i];

            if (equippedChips.indexOf(chip.id) == -1) {
                unequippedChips[unequippedChips.length] = chip;
            }
        }

        return unequippedChips;
    };

    this.RenderChipPage = function(pageNumber) {
        var positionInArray = ((pageNumber - 1) * 3) - 1;
        if (positionInArray < 0) {
            positionInArray = 0;
        } else {
            positionInArray += 1;
        }
        var positionInArrayEnd = positionInArray + 3;
        var chipsToDisplay = SoundMachine.GetUnEquippedChips().slice(positionInArray, positionInArrayEnd);

        var placeholders = document.querySelectorAll(".chip-placeholder");

        for (var i = 0; i < placeholders.length; i++) {
            var placeholder = placeholders[i];
            var chip = chipsToDisplay[i];

            if (chip != null) {
                placeholder.innerHTML = chip.name;
                placeholder.style.backgroundImage = "url('img/chips/" + chip.id + ".gif')";
                placeholder.setAttribute('data-chip-id', chip.id);
                placeholder.onclick = function() {
                    var chipId = this.getAttribute('data-chip-id');
                    SoundMachine.EquipChip(chipId);
                };
            } else {
                placeholder.innerHTML = '';
                placeholder.style.backgroundImage = '';
                placeholder.setAttribute('data-chip-id', -1);
                placeholder.onclick = null;
            }
        }

        var formulaFull = Math.floor(SoundMachine.GetUnEquippedChips().length / 3);
        var formulaRest = SoundMachine.GetUnEquippedChips().length % 3;
        var formulaMax = formulaFull + (formulaRest > 0 ? 1 : 0);

        SoundMachine.CurrentPageNumber = pageNumber;
        SoundMachine.MaximalPageNumber = formulaMax;

        var minPagePointer = document.getElementById('chips-controller-minpage');
        minPagePointer.innerHTML = SoundMachine.CurrentPageNumber;
        var maxPagePointer = document.getElementById('chips-controller-maxpage');
        maxPagePointer.innerHTML = SoundMachine.MaximalPageNumber;

        var canBackward = pageNumber > 1,
            canForward = pageNumber < SoundMachine.MaximalPageNumber;

        var backwardControlButton = document.getElementById('chips-controller-backward');
        backwardControlButton.style.backgroundImage = "url('" + (
            canBackward ? "img/base/chips_controller_backward_enabled.png" : "img/base/chips_controller_backward_disabled.png"
        ) + "')";

        if (backwardControlButton.onclick == null) {
            backwardControlButton.onclick = function() {
                SoundMachine.SwitchChipPage(true);
            };
        }

        var forwardControlButton = document.getElementById('chips-controller-forward');
        forwardControlButton.style.backgroundImage = "url('" + (
            canForward ? "img/base/chips_controller_forward_enabled.png" : "img/base/chips_controller_forward_disabled.png"
        ) + "')";

        if (forwardControlButton.onclick == null) {
            forwardControlButton.onclick = function() {
                SoundMachine.SwitchChipPage(false);
            };
        }
    };

    this.SwitchChipPage = function(isBackwards) {
        var canBackward = SoundMachine.CurrentPageNumber > 1,
            canForward = SoundMachine.CurrentPageNumber < SoundMachine.MaximalPageNumber;

        if ((isBackwards && !canBackward) || (!isBackwards && !canForward)) {
            return;
        }

        var newPageNumber = SoundMachine.CurrentPageNumber + (isBackwards ? -1 : 1);
        SoundMachine.RenderChipPage(newPageNumber);
    };

    this.EquipChip = function(chipId) {
        var placeholders = document.querySelectorAll(".chips-equipped-placeholder");
        var emptyPlaceholder = null;

        for (var i = 0; i < placeholders.length; i++) {
            var placeholder = placeholders[i];

            if (placeholder.getAttribute('data-equipped-chip-id') == -1) {
                emptyPlaceholder = placeholder;
                break;
            }
        }

        if (emptyPlaceholder == null) {
            return;
        }

        var chipInfo = SoundMachine.GetChipInfo(chipId);

        var title = emptyPlaceholder.querySelector('.chips-equipped-title');
        var setInfo = function() {
            title.innerHTML = chipInfo.name;
            title.style.backgroundImage = "url('img/base/chip_equipped_title_equipped.png')";
            title.style.color = SoundMachine.ShadeColor(chipInfo.color, -120);
            title.style.cursor = 'pointer';
        };
        title.onmouseenter = function() {
            this.innerHTML = 'Eject';
        };
        title.onclick = function() {
            SoundMachine.EjectChip(chipInfo.id);
        };
        title.onmouseleave = setInfo;
        setInfo();

        var body = emptyPlaceholder.querySelector('.chips-equipped-body');

        for (var i = 1; i <= 9; i++) {
            var sampleId = chipInfo.samples[i - 1];
            body.innerHTML += '<div class="chips-equipped-sample" data-sample-id="' + sampleId + '"></div>';
        }

        var samples = body.querySelectorAll('.chips-equipped-sample');

        for (var i = 0; i < samples.length; i++) {
            var sample = samples[i];

            sample.style.backgroundImage = "url('img/samples/" + i + ".png')";
            sample.style.backgroundColor = chipInfo.color;
            sample.setAttribute('data-sample-index', i);

            sample.onmouseenter = function() {
                this.style.backgroundColor = SoundMachine.BrightenColor(chipInfo.color, 50);

                var sampleId = (this.getAttribute('data-sample-id') * 1);
                SoundMachine.PlaySample(sampleId);
            };
            sample.onmouseleave = function() {
                this.style.backgroundColor = chipInfo.color;

                SoundMachine.PlaySample(-1);
            };
            sample.onclick = function() {
                var sampleId = (this.getAttribute('data-sample-id') * 1);
                SoundMachine.SelectSample(sampleId, chipInfo.id, this);
            };
        }

        emptyPlaceholder.setAttribute('data-equipped-chip-id', chipId);
        SoundMachine.RenderChipPage(1);
    };

    this.EjectChip = function(chipId) {
        var placeholders = document.querySelectorAll(".chips-equipped-placeholder");
        var selectedPlaceholder = null;

        for (var i = 0; i < placeholders.length; i++) {
            var placeholder = placeholders[i];

            if (placeholder.getAttribute('data-equipped-chip-id') == chipId) {
                selectedPlaceholder = placeholder;
                break;
            }
        }

        if (selectedPlaceholder == null) {
            return;
        }

        var title = selectedPlaceholder.querySelector('.chips-equipped-title');
        title.innerHTML = '';
        title.style.backgroundImage = "url('img/base/chip_equipped_title_unequipped.png')";
        title.style.color = 'black';
        title.style.cursor = 'default';
        title.onmouseenter = null;
        title.onmouseleave = null;
        title.onclick = null;

        var body = selectedPlaceholder.querySelector('.chips-equipped-body');
        body.innerHTML = '';

        selectedPlaceholder.setAttribute('data-equipped-chip-id', -1);
        SoundMachine.RenderChipPage(1);

        if (SoundMachine.SelectedChipId == chipId) {
            SoundMachine.SelectSample(-1, -1, null);
        }

        var chipInfo = SoundMachine.GetChipInfo(chipId);
        var cells = document.querySelectorAll(".designer-wrapper-cell");

        for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];
            var sampleId = (cell.getAttribute('data-sample-id') * 1);

            if (chipInfo.samples.indexOf(sampleId) != -1) {
                SoundMachine.ClickDesignerCell(cell);
            }
        }
    };

    this.ShadeColor = function(color, shade) {
        var colorInt = parseInt(color.substring(1), 16);

        var R = (colorInt & 0xFF0000) >> 16;
        var G = (colorInt & 0x00FF00) >> 8;
        var B = (colorInt & 0x0000FF) >> 0;

        R = R + Math.floor((shade / 255) * R);
        G = G + Math.floor((shade / 255) * G);
        B = B + Math.floor((shade / 255) * B);

        var newColorInt = (R << 16) + (G << 8) + (B);
        var newColorStr = "#" + newColorInt.toString(16);

        return newColorStr;
    }

    this.BrightenColor = function(hex, percent) { // strip the leading # if it's there
        hex = hex.replace(/^\s*#|\s*$/g, '');

        // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
        if (hex.length == 3) {
            hex = hex.replace(/(.)/g, '$1$1');
        }

        var r = parseInt(hex.substr(0, 2), 16),
            g = parseInt(hex.substr(2, 2), 16),
            b = parseInt(hex.substr(4, 2), 16);

        return '#' + (
            (0 | (1 << 8) + r + (256 - r) * percent / 100).toString(16)
        ).substr(1) + ((0 | (1 << 8) + g + (256 - g) * percent / 100).toString(16)).substr(1) + ((0 | (1 << 8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
    };

    this.PlaySample = function(sampleId) {
        if (SoundMachine.IsPlaying) {
            return;
        }

        if (SoundMachine.SamplePreviewPlayer != null) {
            SoundMachine.SamplePreviewPlayer.pause();
        }

        if (sampleId > 0) {
            SoundMachine.SamplePreviewPlayer = new Audio();
            SoundMachine.SamplePreviewPlayer.src = SoundMachine.Configuration.sampleFormat.replace('$id', sampleId);
            SoundMachine.SamplePreviewPlayer.play();
        }
    };

    this.SelectSample = function(sampleId, chipId, element) {
        if (SoundMachine.SelectedChipId > 0) {
            var selectedIndex = (SoundMachine.SelectedSampleElement.getAttribute('data-sample-index') * 1);
            SoundMachine.SelectedSampleElement.style.backgroundImage = "url('img/samples/" + selectedIndex + ".png')";
        }

        if (SoundMachine.SelectedSampleId == sampleId) {
            sampleId = -1;
            chipId = -1;
            element = null;
        }

        SoundMachine.SelectedChipId = chipId;
        SoundMachine.SelectedSampleId = sampleId;
        SoundMachine.SelectedSampleElement = element;

        if (sampleId == -1) {
            return;
        }

        var mySelectedIndex = (element.getAttribute('data-sample-index') * 1);
        element.style.backgroundImage = "url('img/samples/" + mySelectedIndex + ".png')";

        SoundMachine.RequestSampleBlockSize(sampleId);
    };

    this.RenderTable = function(startPosition) {
        var rows = document.querySelectorAll(".designer-wrapper-row");
        var maxColumnSize = 24;

        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var rowIndex = (row.getAttribute('data-row-id') * 1);

            row.innerHTML = '';

            for (var column = startPosition; column <= (startPosition + (maxColumnSize - 1)); column++) {
                row.innerHTML += '<div class="designer-wrapper-cell" data-row-id="' + rowIndex + '" data-column-id="' + column + '" data-sample-id="-1" data-parent-id="-1"></div>';
                row.innerHTML += '<div class="designer-wrapper-cell-seal" data-row-id="' + rowIndex + '" data-column-id="' + column + '"></div>';
            }
        }

        var cells = document.querySelectorAll(".designer-wrapper-cell");

        for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];

            cell.onmouseenter = function() {
                SoundMachine.EnterDesignerCell(this);
            };
            cell.onmouseleave = function() {
                SoundMachine.LeaveDesignerCell(this);
            };
            cell.onclick = function() {
                SoundMachine.ClickDesignerCell(this);
            };
        }
    };

    this.EnterDesignerCell = function(baseCell) {
        var rowId = (baseCell.getAttribute('data-row-id') * 1);
        var columnId = (baseCell.getAttribute('data-column-id') * 1);
        var sampleId = (baseCell.getAttribute('data-sample-id') * 1);

        if (sampleId != -1) {
            return;
        }

        if (SoundMachine.CanPlaceCell(baseCell, SoundMachine.SelectedSampleId) == false) {
            return;
        }

        var chipInfo = SoundMachine.GetChipInfo(SoundMachine.SelectedChipId);

        if (chipInfo == null) {
            return;
        }

        var affected = SoundMachine.GetAffectedCells(baseCell, SoundMachine.SelectedSampleId);

        for (var i = 0; i < affected.length; i++) {
            var cell = affected[i];
            var mySelectedIndex = (SoundMachine.SelectedSampleElement.getAttribute('data-sample-index') * 1);

            cell.style.backgroundImage = "url('img/samples/" + mySelectedIndex + ".png')";
            cell.style.backgroundColor = chipInfo.color;
        }

        var seals = SoundMachine.GetAffectedSeals(baseCell, SoundMachine.SelectedSampleId);

        for (var i = 0; i < seals.length; i++) {
            var seal = seals[i];

            seal.style.backgroundColor = chipInfo.color;
            seal.style.borderTop = '1px solid rgb(20, 20, 20)';
            seal.style.borderBottom = '1px solid rgb(20, 20, 20';
        }
    };

    this.CanPlaceCell = function(baseCell, sampleId) {
        var affected = SoundMachine.GetAffectedCells(baseCell, sampleId);

        for (var i = 0; i < affected.length; i++) {
            var cell = affected[i];
            var cellSample = (cell.getAttribute('data-sample-id') * 1);

            if (cellSample != -1)
                return false;


        }

        return true;
    };

    this.GetAffectedCells = function(cell, sampleId) {
        var rowId = (cell.getAttribute('data-row-id') * 1);
        var columnId = (cell.getAttribute('data-column-id') * 1);

        var output = new Array();
        var blockSize = SoundMachine.SampleBlockSizes[sampleId];

        for (var i = 0; i < blockSize; i++) {
            var _columnId = columnId + i;
            var affectedCell = SoundMachine.GetDesignerCell(rowId, _columnId);

            if (affectedCell != null) {
                output[output.length] = affectedCell;
            }
        }

        return output;
    };

    this.GetAffectedSeals = function(cell, sampleId) {
        var rowId = (cell.getAttribute('data-row-id') * 1);
        var columnId = (cell.getAttribute('data-column-id') * 1);

        var output = new Array();
        var blockSize = SoundMachine.SampleBlockSizes[sampleId];

        for (var i = 0; i < (blockSize - 1); i++) {
            var _columnId = columnId + i;
            var affectedSeal = SoundMachine.GetDesignerSeal(rowId, _columnId);

            if (affectedSeal != null) {
                output[output.length] = affectedSeal;
            }
        }

        return output;
    };

    this.GetDesignerCell = function(rowId, columnId) {
        var cells = document.querySelectorAll(".designer-wrapper-cell");

        for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];
            var _rowId = (cell.getAttribute('data-row-id') * 1);
            var _columnId = (cell.getAttribute('data-column-id') * 1);

            if (_rowId == rowId && _columnId == columnId) {
                return cell;
            }
        }

        return null;
    };

    this.GetDesignerSeal = function(rowId, columnId) {
        var seals = document.querySelectorAll(".designer-wrapper-cell-seal");

        for (var i = 0; i < seals.length; i++) {
            var seal = seals[i];
            var _rowId = (seal.getAttribute('data-row-id') * 1);
            var _columnId = (seal.getAttribute('data-column-id') * 1);

            if (_rowId == rowId && _columnId == columnId) {
                return seal;
            }
        }

        return null;
    };

    this.LeaveDesignerCell = function(baseCell) {
        var rowId = (baseCell.getAttribute('data-row-id') * 1);
        var columnId = (baseCell.getAttribute('data-column-id') * 1);
        var sampleId = (baseCell.getAttribute('data-sample-id') * 1);

        if (sampleId != -1) {
            return;
        }

        if (SoundMachine.CanPlaceCell(baseCell, SoundMachine.SelectedSampleId) == false) {
            return;
        }

        var affected = SoundMachine.GetAffectedCells(baseCell, SoundMachine.SelectedSampleId);

        for (var i = 0; i < affected.length; i++) {
            var cell = affected[i];

            cell.style.backgroundImage = '';
            cell.style.backgroundColor = '';
        }

        var seals = SoundMachine.GetAffectedSeals(baseCell, SoundMachine.SelectedSampleId);

        for (var i = 0; i < seals.length; i++) {
            var seal = seals[i];

            seal.style.backgroundColor = '';
            seal.style.borderTop = '';
            seal.style.borderBottom = '';
        }
    };

    this.ClickDesignerCell = function(baseCell) {

        if (SoundMachine.IsPlaying) {
            SoundMachine.Pause();
        }

        var currentSampleId = (baseCell.getAttribute('data-sample-id') * 1);
        var isApply = currentSampleId == -1;
        var newSampleId = isApply ? SoundMachine.SelectedSampleId : currentSampleId;

        if (isApply && SoundMachine.CanPlaceCell(baseCell, SoundMachine.SelectedSampleId) == false) {
            isApply = false;
            return;
        }

        var rowId = (baseCell.getAttribute('data-row-id') * 1);
        var parentId = (baseCell.getAttribute('data-parent-id') * 1);

        if (parentId > 0) {
            var parentCell = SoundMachine.GetDesignerCell(rowId, parentId);
            SoundMachine.ClickDesignerCell(parentCell);
            return;
        }

        var chipInfo = SoundMachine.GetChipInfo(SoundMachine.SelectedChipId);
        var affected = SoundMachine.GetAffectedCells(baseCell, newSampleId);

        for (var i = 0; i < affected.length; i++) {
            var cell = affected[i];

            if (isApply) {
                var mySelectedIndex = (SoundMachine.SelectedSampleElement.getAttribute('data-sample-index') * 1);

                cell.style.backgroundImage = "url('img/samples/" + mySelectedIndex + ".png')";
                cell.style.backgroundColor = chipInfo.color;
                cell.setAttribute('data-sample-id', newSampleId);

                if (cell != baseCell) {
                    cell.setAttribute('data-parent-id', baseCell.getAttribute('data-column-id'));
                }
            } else {
                cell.style.backgroundImage = '';
                cell.style.backgroundColor = '';
                cell.setAttribute('data-sample-id', -1);
                cell.setAttribute('data-parent-id', -1);
            }
        }

        var seals = SoundMachine.GetAffectedSeals(baseCell, newSampleId);

        for (var i = 0; i < seals.length; i++) {
            var seal = seals[i];

            if (isApply) {
                seal.style.backgroundColor = chipInfo.color;
                seal.style.borderTop = '1px solid rgb(20, 20, 20)';
                seal.style.borderBottom = '1px solid rgb(20, 20, 20';
            } else {
                seal.style.backgroundColor = '';
                seal.style.borderTop = '';
                seal.style.borderBottom = '';
            }
        }
    };

    this.RequestSampleBlockSize = function(sampleId) {
        var tempAudio = new Audio();
        tempAudio.addEventListener('loadedmetadata', function() {
            var size = Math.round(this.duration) / 2;
            if (size > 4) {
                size = 4;
            }
            SoundMachine.SampleBlockSizes[sampleId] = size;
        });
        tempAudio.src = SoundMachine.Configuration.sampleFormat.replace('$id', sampleId);
    };

    this.SerializeButtons = function() {
        var musicControlButton = document.getElementById('controls-music-button');
        musicControlButton.onmousedown = function() {
            this.style.backgroundImage = SoundMachine.IsPlaying ? "url('img/base/button_pause_clicked.png')" : "url('img/base/button_play_clicked.png')";
            console.log('asdasdasdasd');
        };
        musicControlButton.onclick = function() {
            if (SoundMachine.IsPlaying) {
                SoundMachine.Pause();
            } else {
                SoundMachine.Play();
            }
        };

        var saveButton = document.getElementById('controls-save-button');
        saveButton.onmousedown = function() {
            this.style.backgroundImage = "url('img/base/button_save_clicked.png')";
        };
        saveButton.onclick = function() {
            saveButton.style.backgroundImage = "url('img/base/button_save_default.png')";
            SoundMachine.GenerateOutput();
        };
    };

    this.SerializePointer = function() {
        var pointer = document.getElementById('designer-pointer');
        SoundMachine.SetPointerPosition(1);

        var pos = null;
        var editor = this;
        var dragging = false;

        var mouseMove = function(e) {
            if (!dragging || SoundMachine.IsPlaying) {
                return false;
            }

            var next = (e.clientX - pos);
            var after = (next % 22);
            next = next - after + 1;

            if (next < 0 || next > 520) {
                return false;
            }

            pointer.style.left = next + 'px';
            document.body.style.cursor = 'move';
            return true;
        };
        var mouseDown = function(e) {
            if (pos == null) {
                var parent = null;
                pos = e.clientX;
            }

            /*if(e.clientY < 340) {
            	return false; // todo make only happen on the RIDGE
            }*/

            dragging = true;
            return false;
        };
        var mouseUp = function(e) {
            document.body.style.cursor = 'default';
            dragging = false;
            return false;
        };

        pointer.onmousedown = mouseDown;
        window.onmouseup = mouseUp;
        window.onmousemove = mouseMove;
    };

    this.IsAnythingToPlayAfter = function(position) {
        var output = false;
        var cells = document.querySelectorAll(".designer-wrapper-cell");

        for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];
            var columnId = (cell.getAttribute('data-column-id') * 1);
            var sampleId = (cell.getAttribute('data-sample-id') * 1);

            if (sampleId > 0 && columnId >= position) {
                output = true;
            }
        }

        return output;
    };

    // PLay function
    this.Play = function() {
        SoundMachine.IsPlaying = true;
        SoundMachine.InitialLoop = true;

        var musicControlButton = document.getElementById('controls-music-button');
        musicControlButton.style.backgroundImage = "url('img/base/button_pause_default.png')";

        SoundMachine.PlayingSamples = new Array();
        SoundMachine.PlayerPosition = SoundMachine.GetPointerPosition();

        /*if (!SoundMachine.IsAnythingToPlayAfter(SoundMachine.PlayerPosition)) {
            if (SoundMachine.PlayerPosition == 1) {
                SoundMachine.Pause();
                return;
            }

            SoundMachine.PlayerPosition = 1;
            SoundMachine.SetPointerPosition(SoundMachine.PlayerPosition);
        }*/

        SoundMachine.PlayNextPositionPreRecorded();

        // SoundMachine.PlayerInterval = setInterval(SoundMachine.PlayNextPositionPreRecorded, 2000);
    };
    /*this.Play = function() {
        SoundMachine.IsPlaying = true;
        SoundMachine.InitialLoop = true;

        var musicControlButton = document.getElementById('controls-music-button');
        musicControlButton.style.backgroundImage = "url('img/base/button_pause_default.png')";

        SoundMachine.PlayingSamples = new Array();
        SoundMachine.PlayerPosition = SoundMachine.GetPointerPosition();

        if (!SoundMachine.IsAnythingToPlayAfter(SoundMachine.PlayerPosition)) {
            if (SoundMachine.PlayerPosition == 1) {
                SoundMachine.Pause();
                return;
            }

            SoundMachine.PlayerPosition = 1;
            SoundMachine.SetPointerPosition(SoundMachine.PlayerPosition);
        }

        SoundMachine.PlayNextPosition();
        SoundMachine.PlayerInterval = setInterval(SoundMachine.PlayNextPosition, 2000);
    };*/

    this.GetTrack = function(sample) {
        var track = [];
        sample.split(";").forEach(sample => {
            var samplePiece = sample.split(",")[0];
            var repeat = sample.split(",")[1];
            track.push({ repeat: repeat, piece: samplePiece })
        });
        return track;
    }
    this.GetSong = function() {
        var song = [];
        var test = "?status=0&name=Too lost in the lido&author=Patrick&track1=317,4;408,7;0,1;410,16;413,4;406,4;410,8;412,4:2:0,2;321,2;443,22;91,2;317,8;443,8;412,2;0,2:3:0,3;320,2;0,7;414,4;445,4;412,2;323,2;412,4;96,2;412,2;414,4;445,7;448,1;317,4:4:0,3;324,2;0,6;448,1;0,6;96,2;322,4;96,2;99,2;322,4;412,2;0,2;322,2;96,2;322,2;0,1;324,2;0,3&track2=0,2;321,2;443,22;91,2;317,8;443,8;412,2;0,2:3:0,3;320,2;0,7;414,4;445,4;412,2;323,2;412,4;96,2;412,2;414,4;445,7;448,1;317,4:4:0,3;324,2;0,6;448,1;0,6;96,2;322,4;96,2;99,2;322,4;412,2;0,2;322,2;96,2;322,2;0,1;324,2;0,3&track3=0,3;320,2;0,7;414,4;445,4;412,2;323,2;412,4;96,2;412,2;414,4;445,7;448,1;317,4:4:0,3;324,2;0,6;448,1;0,6;96,2;322,4;96,2;99,2;322,4;412,2;0,2;322,2;96,2;322,2;0,1;324,2;0,3&track4=0,3;324,2;0,6;448,1;0,6;96,2;322,4;96,2;99,2;322,4;412,2;0,2;322,2;96,2;322,2;0,1;324,2;0,3";

        var urlSearchParams = new URLSearchParams(test);
        var track1 = urlSearchParams.get("track1").split(":2:")[0];
        var track2 = urlSearchParams.get("track1").split(":2:")[1].split(":3:")[0];
        var track3 = urlSearchParams.get("track1").split(":2:")[1].split(":3:")[1].split(":4:")[0];
        var track4 = urlSearchParams.get("track1").split(":2:")[1].split(":3:")[1].split(":4:")[1];
        console.log(SoundMachine.GetTrack(track1))
        console.log(SoundMachine.GetTrack(track2))
        console.log(SoundMachine.GetTrack(track3))
        console.log(SoundMachine.GetTrack(track4))
        return [SoundMachine.GetTrack(track1), SoundMachine.GetTrack(track2), SoundMachine.GetTrack(track3), SoundMachine.GetTrack(track4)];
    }

    this.GetRepeatCount = function(length, duration) {
        var time = 0;
        if (duration < 2100) {
            time = 2000;
        } else if (duration < 4100) {
            time = 4000;
        } else if (duration < 6100) {
            time = 6000;
        } else {
            time = 8000;
        }
        var totalLength = length * 2000;
        var repeat = totalLength / time;
        console.log("Sample length:" + duration + " repeat length:" + totalLength + " => repeat:" + repeat);
        return repeat;
    }

    this.GetSampleLength = function(duration) {

        var _loc2_ = duration;
        if (_loc2_ < 2100) {
            return 1;
        }
        if (_loc2_ < 4100) {
            return 2;
        }
        if (_loc2_ < 6100) {
            return 3;
        }
        if (_loc2_ < 8100) {
            return 4;
        }
        throw new Error("Sample is too long:");
    }

    this.GetDuration = function(src, sample, repeat, track) {
        return new Promise(function(resolve) {
            var audio = new Audio();
            audio.addEventListener('loadedmetadata', function() {

                resolve({
                    repeatLength: SoundMachine.GetRepeatCount(repeat, audio.duration),
                    sampleLength: SoundMachine.GetSampleLength(audio.duration),
                    sample: sample,
                    repeat: repeat,
                    audioObj: audio,
                    src: audio.src,
                    track: track
                });
            });
            audio.src = src;
        });
    }

    this.GetSampleAudioQueue = function(s) {

        console.log("TRACK" + s.track);
        /* s.audioObj.addEventListener("timeupdate", function() {
             if (SoundMachine.GetDurationtrack1Player.currentTime >= audioObjectArray[0][track1Index].sampleLength * 2){    
                 track1Player.pause(); 
              };
             
             });
         }*/
        switch (s.track) {
            case 0:
                s.audioObj.addEventListener("timeupdate", function() {
                    console.log("TIME: " + track1Player.currentTime)
                    console.log("DURATION: " + track1Player.duration)
                    if (track1Player.currentTime * 1000 >= (track1Player.duration * 1000 - 100)) {
                        console.log("K");
                        //track1Player.pause();
                    }
                    /*if (SoundMachine.GetSampleLength(track1Player.currentTime * 1000) == audioObjectArray[0][track1Index].sampleLength) {

                        console.log("Track1 Ended")
                        track1Index++;
                        track1Player = audioObjectArray[0][track1Index].audio;
                        track1Player.play();
                    };*/
                });

                s.audioObj.addEventListener("pause", function() {
                    console.log("Track1 Ended")
                    track1Index++;
                    track1Player = audioObjectArray[0][track1Index].audio;
                    track1Player.duration = audioObjectArray[0][track1Index].sampleLength * 2;
                    track1Player.play();
                });


                break;
            case 1:
                s.audioObj.addEventListener("ended", function() {
                    console.log("Track2 Ended")
                    track2Index++;
                    track2Player = audioObjectArray[1][track2Index].audio;
                    track2Player.duration = audioObjectArray[0][track1Index].sampleLength * 2;
                    track2Player.play();
                });
                break;
            case 2:
                s.audioObj.addEventListener("ended", function() {
                    console.log("Track3 Ended")
                    track3Index++;
                    track3Player = audioObjectArray[2][track3Index].audio;
                    track3Player.duration = audioObjectArray[0][track1Index].sampleLength * 2;
                    track3Player.play();
                });

                break;
            case 3:
                s.audioObj.addEventListener("ended", function() {
                    console.log("Track4 Ended")
                    track4Index++;
                    track4Player = audioObjectArray[3][track4Index].audio;
                    track4Player.duration = audioObjectArray[0][track1Index].sampleLength * 2;
                    track4Player.play();
                });
                break;
        }


        var queue = [];
        for (let i = 0; i < s.repeat; i++) {
            queue.push({ audio: s.audioObj, sampleLength: s.sampleLength });

        }
        console.log(queue)
        return queue;
    }

    this.FlatArray = function(input) {

        const stack = [...input];
        const res = [];
        while (stack.length) {
            const next = stack.pop();
            if (Array.isArray(next)) {
                stack.push(...next);
            } else {
                res.push(next);
            }
        }
        return res.reverse();
    }

    this.LoadSamples = function(samples) {
        var promises = [];
        var tracks = [];
        samples.forEach(function(track) {
            var trackData = [];
            track.forEach(function(s) {
                promises.push(SoundMachine.GetDuration(SoundMachine.Configuration.sampleFormat.replace('$id', s.piece), s.sample, s.repeat, samples.indexOf(track)));
            });

        });

        Promise.all(promises).then(function(e) {
            console.log("All samples loaded - build queue")
            e.forEach(function(s) {
                console.log(s);
                audioObjectArray[s.track].push(...SoundMachine.GetSampleAudioQueue(s));
            });


            console.log(audioObjectArray);


            track1Player = audioObjectArray[0][track1Index].audio;
            track1Player.duration = audioObjectArray[0][track1Index].sampleLength * 2;
            track1Player.play();

            track2Player = audioObjectArray[1][track2Index].audio;
            track2Player.play();

            track3Player = audioObjectArray[2][track3Index].audio;
            track3Player.play();

            track4Player = audioObjectArray[3][track4Index].audio;
            track4Player.play();

        });
    }

    this.playAudio = function(audio, callback) {
        audio.play();
        if (callback) {
            // When the audio object completes it's playback, call the callback
            // provided
            audio.addEventListener('ended', callback);
        }
    }


    this.play_sound_queue = function(sounds) {
        var index = 0;

        function recursive_play() {
            // If the index is the last of the table, play the sound
            // without running a callback after
            if (index + 1 === sounds.length) {
                SoundMachine.playAudio(sounds[index], null);
            } else {
                // Else, play the sound, and when the playing is complete
                // increment index by one and play the sound in the
                // indexth position of the array
                SoundMachine.playAudio(sounds[index], function() {
                    index++;
                    recursive_play();
                });
            }
        }

        // Call the recursive_play for the first time
        recursive_play();
    }

    this.PlayNextPositionPreRecorded = function() {
        console.log("PLAYER POS: " + SoundMachine.PlayerPosition)
        var song = SoundMachine.GetSong();
        SoundMachine.LoadSamples(song);


        return;
        for (var i = 0; i <= 3; i++) {
            if (song[i] == null) {
                SoundMachine.PlayerPosition = 0;
                return;
            }
            var sample = song[i][SoundMachine.PlayerPosition];
            console.log("SAMPLE: ")
            console.log(sample)
            if (sample != null) {
                SoundMachine.PlaySamplePiece(sample.piece, 0);
            }

            /*samples.forEach(function(sample) {
                console.log(sample)
                
            });*/


        }

        SoundMachine.SetPointerPosition(SoundMachine.PlayerPosition);
        SoundMachine.PlayerPosition += 1;
        SoundMachine.InitialLoop = false;
    };

    this.PlayNextPosition = function() {
        console.log("Play next positon")
        if (!SoundMachine.IsAnythingToPlayAfter(SoundMachine.PlayerPosition)) {
            console.log("Nope")
            SoundMachine.PlayerPosition = 1;
            SoundMachine.SetPointerPosition(SoundMachine.PlayerPosition);
            SoundMachine.PlayNextPosition();
            return;
        }

        for (var i = 1; i <= 4; i++) {
            var cell = SoundMachine.GetDesignerCell(i, SoundMachine.PlayerPosition);
            console.log(cell)
            if (cell == null) {
                SoundMachine.PlayerPosition = 1;
                return;
            }

            var sampleId = (cell.getAttribute('data-sample-id'));
            var parentId = (cell.getAttribute('data-parent-id'));
            console.log(sampleId);
            console.log(parentId)
            if (sampleId != -1 && parentId == -1) {
                console.log("Play from pos 0")
                SoundMachine.PlaySamplePiece(sampleId, 0);
            } else if (sampleId != -1 && parentId != -1 && SoundMachine.InitialLoop) {
                var pos = (Math.abs(SoundMachine.PlayerPosition - parentId) * 2);
                console.log("Play from pos : " + pos)
                SoundMachine.PlaySamplePiece(sampleId, pos);
            }
        }

        SoundMachine.SetPointerPosition(SoundMachine.PlayerPosition);
        SoundMachine.PlayerPosition += 1;
        SoundMachine.InitialLoop = false;
    };

    this.PlaySamplePiece = function(sampleId, pos) {
        console.log("Play sample")
        var sample = new Audio();
        sample.src = SoundMachine.Configuration.sampleFormat.replace('$id', sampleId);
        console.log(sample.src);
        sample.play();


        SoundMachine.PlayingSamples[SoundMachine.PlayingSamples.length] = sample;
    };

    this.Pause = function() {
        SoundMachine.IsPlaying = false;

        var musicControlButton = document.getElementById('controls-music-button');
        musicControlButton.style.backgroundImage = "url('img/base/button_play_default.png')";

        clearInterval(SoundMachine.PlayerInterval);

        for (var i = 0; i < SoundMachine.PlayingSamples.length; i++) {
            var sample = SoundMachine.PlayingSamples[i];
            sample.pause();
        }
    };

    this.GetPointerPosition = function() {
        var pointer = document.getElementById('designer-pointer');
        var left = (pointer.style.left.replace('px', '') * 1) - 1;
        var pos = (left / 22) + 1;
        return pos;
    };

    this.SetPointerPosition = function(position) {
        var pointer = document.getElementById('designer-pointer');
        var left = (((position - 1) * 22) + 1);
        pointer.style.left = left + 'px';
    };

    this.GenerateOutput = function() {
        var cells = document.querySelectorAll(".designer-wrapper-cell");

        var rows = new Array();

        for (var r = 1; r <= 4; r++) {
            var work = new Array();

            for (var c = 1; c <= (cells.length / 4); c++) {
                var cell = SoundMachine.GetDesignerCell(r, c);
                var sampleId = (cell.getAttribute('data-sample-id') * 1);

                if (sampleId == -1) {
                    sampleId = 0;
                }

                work[c] = sampleId;
            }

            rows[r] = work;
        }

        var output = '';

        for (var r = 1; r < rows.length; r++) {
            var row = rows[r];
            output += r + ':';

            var workingSample = -1;
            var workingLength = 0;

            for (var c = 1; c <= row.length; c++) {
                var sampleId = row[c];

                if (workingSample != sampleId) {
                    if (workingSample != -1 && workingLength > 0 && (workingSample != 0 && c != row.length)) {
                        output += workingSample + ',' + workingLength + ';';
                    }
                    workingSample = sampleId;
                    workingLength = 1;
                } else {
                    workingLength++;
                }
            }

            if (output[output.length - 1] == ';') {
                output = output.substring(0, output.length - 1);
            }

            output += ':';
        }

        window.prompt('Press CTRL + C to copy Trax Information!', output);
    };
}

var SoundMachine = new SoundMachine();
SoundMachine.LoadOrReloadChips();
SoundMachine.SerializeButtons();
SoundMachine.SerializePointer();
SoundMachine.RenderChipPage(1);
SoundMachine.RenderTable(1);