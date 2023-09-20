import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import PropTypes from 'prop-types'

import authorsPageInitialPaths3c173Resource from '../../resources/authors-page-initial-paths-3c173'
import authorsPageInitialPropsAb03bResource from '../../resources/authors-page-initial-props-ab03b'

const Authors11 = (props) => {
  return (
    <>
      <div className="authors11-container">
        <Head>
          <title>Authors1 - Lead Program Planner</title>
          <meta property="og:title" content="Authors1 - Lead Program Planner" />
        </Head>
        <DataProvider
          renderSuccess={(AuthorsEntity) => (
            <>
              <div className="authors11-container1">
                <h1>{AuthorsEntity?.Name}</h1>
                <span>{AuthorsEntity?.Linkedin}</span>
                <span>{AuthorsEntity?.Twitter}</span>
              </div>
            </>
          )}
          initialData={props.authorsEntity}
          persistDataDuringLoading={true}
          key={props?.authorsEntity?.id}
        />
      </div>
      <style jsx>
        {`
          .authors11-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .authors11-container1 {
            gap: 12px;
            width: 100%;
            display: flex;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

Authors11.defaultProps = {
  authorsEntity: [],
}

Authors11.propTypes = {
  authorsEntity: PropTypes.array,
}

export default Authors11

export async function getStaticPaths() {
  try {
    const response = await authorsPageInitialPaths3c173Resource({})
    return {
      paths: (response?.data || []).map((item) => {
        return {
          params: {
            id: (item?.id).toString(),
          },
        }
      }),
      fallback: 'blocking',
    }
  } catch (error) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
}

export async function getStaticProps(context) {
  try {
    const response = await authorsPageInitialPropsAb03bResource({
      ...context?.params,
    })
    if (!response?.data?.[0]) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        authorsEntity: response?.data?.[0],
        ...response?.meta,
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
