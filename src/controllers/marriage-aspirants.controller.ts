import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import { MarriageAspirants } from '../models';
import { EventRepository, MarriageRepository } from '../repositories';
import { MarriageAspirantsRepository } from '../repositories/marriage-aspirants.repository';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Set the fonts for pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class MarriageAspirantsController {
  [x: string]: any;
  constructor(
    @repository(MarriageAspirantsRepository)
    public marriageAspirantsRepository: MarriageAspirantsRepository,

    @repository(EventRepository)
    public eventRepository: EventRepository,

    @repository(MarriageRepository)
    public marriageRepository: MarriageRepository,
  ) { }

  // New API Endpoint to get counts of brides, grooms, and total users
  @get('/marriage-aspirants/counts')
  @response(200, {
    description: 'Counts of brides, grooms, and total users',
    content: { 'application/json': { schema: { type: 'array', items: { type: 'object' } } } },
  })
  async getCounts(): Promise<{ heading: string, count: number }[]> {
    const totalBrides = await this.marriageAspirantsRepository.countByGender('female');
    const totalGrooms = await this.marriageAspirantsRepository.countByGender('male');
    const totalUsers = await this.marriageAspirantsRepository.countTotal();
    const totalEvents = await this.eventRepository.countTotal();
    // const totalMarriage = await this.marriageRepository.countTotal();

    return [
      { heading: 'Total Bride', count: totalBrides },
      { heading: 'Total Groom', count: totalGrooms },
      { heading: 'Total User', count: totalUsers },
      { heading: 'Total Events', count: totalEvents },
      // {heading: 'Total Marriages', count: totalMarriage},
    ];
  }

  // Endpoint to create a new marriage aspirant
  @post('/marriage-aspirants')
  @response(200, {
    description: 'MarriageAspirants model instance',
    content: { 'application/json': { schema: getModelSchemaRef(MarriageAspirants) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MarriageAspirants, {
            title: 'NewMarriageAspirants',
            exclude: ['id'],
          }),
        },
      },
    })
    marriageAspirants: Omit<MarriageAspirants, 'id'>,
  ): Promise<MarriageAspirants> {
    return this.marriageAspirantsRepository.create(marriageAspirants);
  }

  // Endpoint to get the count of marriage aspirants
  @get('/marriage-aspirants/count')
  @response(200, {
    description: 'MarriageAspirants model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(MarriageAspirants) where?: Where<MarriageAspirants>,
  ): Promise<Count> {
    return this.marriageAspirantsRepository.count(where);
  }

  // Endpoint to get all marriage aspirants
  @get('/marriage-aspirants')
  @response(200, {
    description: 'Array of MarriageAspirants model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MarriageAspirants, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(MarriageAspirants) filter?: Filter<MarriageAspirants>,
  ): Promise<MarriageAspirants[]> {
    return this.marriageAspirantsRepository.find(filter);
  }

  // Endpoint to update all marriage aspirants
  @patch('/marriage-aspirants')
  @response(200, {
    description: 'MarriageAspirants PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MarriageAspirants, { partial: true }),
        },
      },
    })
    marriageAspirants: MarriageAspirants,
    @param.where(MarriageAspirants) where?: Where<MarriageAspirants>,
  ): Promise<Count> {
    return this.marriageAspirantsRepository.updateAll(marriageAspirants, where);
  }

  // Endpoint to find a marriage aspirant by ID
  @get('/marriage-aspirants/{id}')
  @response(200, {
    description: 'MarriageAspirants model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MarriageAspirants, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MarriageAspirants, { exclude: 'where' }) filter?: FilterExcludingWhere<MarriageAspirants>,
  ): Promise<MarriageAspirants> {
    return this.marriageAspirantsRepository.findById(id, filter);
  }

  // Endpoint to update a marriage aspirant by ID
  @patch('/marriage-aspirants/{id}')
  @response(204, {
    description: 'MarriageAspirants PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MarriageAspirants, { partial: true }),
        },
      },
    })
    marriageAspirants: MarriageAspirants,
  ): Promise<void> {
    await this.marriageAspirantsRepository.updateById(id, marriageAspirants);
  }

  // Endpoint to replace a marriage aspirant by ID
  @put('/marriage-aspirants/{id}')
  @response(204, {
    description: 'MarriageAspirants PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() marriageAspirants: MarriageAspirants,
  ): Promise<void> {
    await this.marriageAspirantsRepository.replaceById(id, marriageAspirants);
  }

  // Endpoint to delete a marriage aspirant by ID
  @del('/marriage-aspirants/{id}')
  @response(204, {
    description: 'MarriageAspirants DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.marriageAspirantsRepository.deleteById(id);
  }

  // New API Endpoint to export marriage aspirants data to PDF
  // New API Endpoint to export marriage aspirants data to PDF
  @get('/marriage-aspirants/exportpdf')
  @response(200, {
    description: 'PDF Document of Marriage Aspirants',
    content: {
      'application/pdf': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async pdf(
    @param.filter(MarriageAspirants) filter?: Filter<MarriageAspirants>,
  ): Promise<any> {
    // Fetch data based on filter
    const customFilter = {
      ...filter,
      fields: {
        firstName: true,
        lastName: true,
        img: true,
        brideGroom: true,
        gender: true,
        dob: true,
        mobileNumber: true,
        emailAddress: true,
        city: true,
        pinCode: true,
        qualification: true,
        income: true,
      },
    };

    const data = await this.marriageAspirantsRepository.find(customFilter);

    // Map data to desired format
    const pdfData = data.map(item => ({
      firstName: item.firstName,
      lastName: item.lastName,
      iAm: item.iAm, // Renamed to match the format
      gender: item.gender,
      dateOfBirth: item.dateOfBirth, // Renamed to match the format
      mobileNumber: item.mobileNumber,
      emailAddress: item.emailAddress,
      city: item.city,
      pinCode: item.pinCode,
      qualification: item.qualification,
      income: item.income,
    }));

    // Define document for PDF
    const documentDefinition: any = {
      pageOrientation: 'landscape',
      pageSize: 'A4',
      content: [
        { text: 'User Information', style: 'header' },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: [
              [
                { text: 'First Name', style: 'tableHeader' },
                { text: 'Last Name', style: 'tableHeader' },
                { text: 'Bride/Groom', style: 'tableHeader' },
                { text: 'Gender', style: 'tableHeader' },
                { text: 'DOB', style: 'tableHeader' },
                { text: 'Mobile Number', style: 'tableHeader' },
                { text: 'Email', style: 'tableHeader' },
                { text: 'City', style: 'tableHeader' },
                { text: 'Pincode', style: 'tableHeader' },
                { text: 'Qualifications', style: 'tableHeader' },
                { text: 'Income', style: 'tableHeader' }
              ],
              ...pdfData.map(item => [
                item.firstName,
                item.lastName,
                item.iAm,
                item.gender,
                item.dateOfBirth,
                item.mobileNumber,
                item.emailAddress,
                item.city,
                item.pinCode,
                item.qualification,
                item.income
              ])
            ]
          },
          layout: {
            fillColor: function (rowIndex: number, node: any, columnIndex: any) {
              return (rowIndex === 0) ? '#007BFF' : (rowIndex % 2 === 0) ? '#F3F3F3' : null;
            },
            hLineColor: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 'black' : '#CCCCCC';
            },
            vLineColor: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : '#CCCCCC';
            },
            paddingLeft: function (i: any, node: any) { return 8; },
            paddingRight: function (i: any, node: any) { return 8; },
            paddingTop: function (i: any, node: any) { return 5; },
            paddingBottom: function (i: any, node: any) { return 5; }
          }
        }
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          margin: [0, 20, 0, 20],
          alignment: 'center',
          color: '#007BFF'
        },
        tableExample: {
          margin: [0, 20, 0, 20]
        },
        tableHeader: {
          bold: true,
          fontSize: 14,
          color: 'white',
          fillColor: '#007BFF',
          alignment: 'center',
          margin: [0, 5, 0, 5]
        }
      },
      defaultStyle: {
        fontSize: 10
      }
    };

    // const res = this.response as any;
    // res.type('application/pdf');
    let buffer = this.generatePdf(documentDefinition)
    // res.send(buffer);
    return buffer;
  }

  async generatePdf(documentDefinition: any) {
    // Create a promise wrapper for getBuffer
    return new Promise((resolve, reject) => {
      pdfMake.createPdf(documentDefinition).getBuffer((buffer) => {
        resolve(buffer);
      });
    });
  };

}
