import React from 'react';
import './App.css';
import jsPDF from "jspdf";
import logo from './logo.png';
import 'jspdf-autotable';



class App extends React.Component {

  constructor(props){
    super(props);
    
    this.state = {
      username : '',
      usermail : '',
      item : '',
      price : 0
      
    }
    
    this.updateInput = this.updateInput.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    }
    
    
    updateInput(event){
      this.setState({username : event.target.value})
    }

    updateEmail(event){
      this.setState({usermail : event.target.value})
    }

    updateItem(event){
      this.setState({item : event.target.value})
    }

    updatePrice(event){
      this.setState({price : event.target.value})
    }

    jsPdfGenerator = () =>{
    
      var doc = new jsPDF();
      //---------- Logo----------
      doc.addImage(logo, 'PNG', 10,0,25,25);

      // -----------Company details----------
      doc.setFontSize(12);
      doc.setTextColor(21, 203, 145);
      doc.text('Company Name',40,10);
      doc.setTextColor(0, 0, 0);
      doc.text('GSTIN:',40,20);
      doc.text('STATE:',40,30);
      doc.text('PAN:',40,40);

      // INvoice details 

      doc.text('TOTAL :',150,10);
      doc.text('Invoice Date :',150,20);
      doc.text('Invoice.No :',150,30);
      doc.text('Ref.No :',150,40);
  
      // Tax Invoice column

      doc.setDrawColor(21, 203, 145);
      doc.setLineWidth(1);
      doc.line(15, 60, 70, 60); 
      doc.setFontSize(18);
      doc.setTextColor(21, 203, 145);
      doc.text('TAX INVOICE',80,60);
      doc.line(130, 60, 195, 60); 
     
      //Customer details
       
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text('Customer Name:',20,70);
      doc.text('' + this.state.username,25,75);
      doc.text('Customer GSTIN:',20,80);
      doc.text(''+ this.state.usermail,25,85);

      doc.text('Billing Address',90,70);
      doc.text('GSTIN:',90,75);
      doc.text('STATE:',90,80);
      doc.text('PAN:',90,85);

      doc.text('Shipping Address',150,70);
      doc.text('GSTIN:',150,75);
      doc.text('STATE:',150,80);
      doc.text('PAN:',150,85);

      doc.setDrawColor(21, 203, 145);
      doc.setLineWidth(1);
      doc.line(15, 90, 195, 90); 

      //Order details

      doc.text('Country of Supply :',20,100);
      doc.text('Place of Supply :',80,100);
      doc.text('Due Date :',150,100);

      doc.setDrawColor(21, 203, 145);
      doc.setLineWidth(1);
      doc.line(15, 110, 195, 110); 
    


      //Table 

      doc.autoTable({ html: '#my-table' })

      doc.autoTable({
        head: [['Item', 'Hsn/quantity SAC', 'Rate/Item', 'Discount', 'Taxable value', 'CGST', 'SGST/UTGST', 'CESS', 'Total']],
        body: [
          [''+this.state.item, ''+ this.state.price,'120','120','120','120','120','120','120'],
          ['Ice cream', '120','120','120','120','120','120','120','120']
         ],

        theme: ['grid'],
        startY: 120,
      })

      doc.text('Taxable Amt :',150,150);
      doc.text('Total Tax :',150,155);
      doc.text('Invoice Total :',150,160);
      doc.text('Total Amt(in words) :',150,165);


      //terms and conditions
      


      doc.save('sample.pdf')
    }

    
    render(){
    return (
        <div className="main">
          <form>
            <label> Name: <input type="text" onChange={this.updateInput}></input></label><br/>
            <label> Email: <input type="email" onChange={this.updateEmail}></input></label><br/>
            <label> Item: <input type="text" onChange={this.updateItem}></input></label><br/>
            <label> Price: <input type="number" onChange={this.updatePrice}></input></label><br/>
            <button onClick={this.jsPdfGenerator} >Download</button>
            </form>
        </div>
      );
    }
    }

    

export default App;
