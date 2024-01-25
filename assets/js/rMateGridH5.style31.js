rMateGridH5.style31 = {
    DataGrid : {
        Styles : {
			color:"#333",
			borderWidth:0,
			selectionColor:"#F3F8FC",
			rollOverColor:"#f4f4f4",
			paddingTop : 0,
			paddingBottom : 0,
			fontSize:"12px",
			fontWeight:"500",
			verticalAlign:"middle",
			textSelectedColor: "#046FD9",
			headerPaddingTop:"0",
			headerPaddingBottom:"0",
			headerColors:["#F3F8FC","#F3F8FC"],
			headerSeparatorColor:"#C9D8F2",
			headerBorderTopWidth:0,
			headerBorderBottomColor:"#C9D8F2",
        }
    },
    DataGridColumn : {
        Styles : {
            paddingLeft : "8px",
            paddingRight : "8px",
			fontWeight:"400",
        }
    },
    DataGridSortItemRenderer : {
        Constants : {
            UP_ICON_NAME : "up-arrow-white.png",
            DOWN_ICON_NAME : "down-arrow-white.png"
        }
    },
    Styles : {
        rMateDataGridHeaderStyles : {
			color:"#666",
			fontSize:"12px",
			fontWeight:"500",
			horizontalAlign:"center",
			verticalAlign:"middle",
        },
		gridFooterStyle : {
			color:"#111",
			backgroundColor:"#f8f8f8",
			borderColor:"var(--primary)",
		}
    }
};

// 그리드 공통css 적용
rMateGridH5.setConfig(rMateGridH5.style31);