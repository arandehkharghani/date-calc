"use strict";
class validate {
    constructor(firstDate, secondDate) {
        this.firstDate = firstDate;
        this.secondDate = secondDate;
        this.validate = () => {
            if (!this.firstDate || !this.secondDate)
                return false;
        };
        this.firstDate = firstDate;
        this.secondDate = secondDate;
    }
}
module.exports = validate;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbGlkYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtJQUVJLFlBQW9CLFNBQWlCLEVBQVUsVUFBa0I7UUFBN0MsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVE7UUFLakUsYUFBUSxHQUFHO1lBQ1AsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDeEMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDLENBQUE7UUFQRyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNqQyxDQUFDO0FBTUwsQ0FBQztBQUVELGlCQUFTLFFBQVEsQ0FBQyIsImZpbGUiOiJ2YWxpZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIHZhbGlkYXRle1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZpcnN0RGF0ZTogc3RyaW5nLCBwcml2YXRlIHNlY29uZERhdGU6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5maXJzdERhdGUgPSBmaXJzdERhdGU7XHJcbiAgICAgICAgdGhpcy5zZWNvbmREYXRlID0gc2Vjb25kRGF0ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdmFsaWRhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmZpcnN0RGF0ZSB8fCAhdGhpcy5zZWNvbmREYXRlKVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0ID0gdmFsaWRhdGU7Il0sInNvdXJjZVJvb3QiOiIifQ==
